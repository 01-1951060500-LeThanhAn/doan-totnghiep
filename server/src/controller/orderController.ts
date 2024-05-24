import { Request, Response } from "express";
import OrderModel from "../model/OrderModel";
import CustomerModel from "../model/CustomerModel";
import ProductModel from "../model/ProductModel";
import GeneralDepotModel from "../model/GeneralDepotModel";
import TransactionModel from "../model/TransactionModel";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, userId, products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!customerId) {
      return res.status(400).json({ message: "customerId is required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const customer = await CustomerModel.findById(customerId);

    if (!customer) {
      return res.status(400).json({ message: "customerId not found" });
    }

    const totalQuantity = products.reduce(
      (acc: number, product: any) => acc + Number(product.quantity),
      0
    );

    for (const product of products) {
      await ProductModel.findByIdAndUpdate(product.productId, {
        $inc: { pendingOrderQuantity: product.quantity },
      });
    }

    let totalPrice = 0;
    for (const product of products) {
      const productData = await ProductModel.findById(product.productId);
      if (!productData) {
        return res
          .status(400)
          .json({ message: `Product not found: ${product.productId}` });
      }

      totalPrice = products.reduce(
        (acc: number, product: any) =>
          acc + Number(product.quantity) * Number(productData.export_price),
        0
      );
    }

    const newOrder = new OrderModel({
      ...req.body,
      customerId: customer._id,
      userId,
      totalQuantity,
      payment_status: "unpaid",
    });

    const currentBalance =
      customer.balance_increases + customer.opening_balance;

    await CustomerModel.findByIdAndUpdate(customerId, {
      balance_increases: currentBalance + totalPrice,
      ending_balance: currentBalance + totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getAllOrder = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { user } = req.user as any;

    if (!user || !user?.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let orders: any[] = [];
    if (user?.role?.name === "admin") {
      orders = await OrderModel.find().populate("userId products.productId");
    } else if (user?.role?.name === "manager") {
      orders = await OrderModel.find({ userId: user._id }).populate(
        "userId products.productId"
      );
    } else {
      orders = [];
    }

    res.status(200).json(orders);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  const cartId = req.params.id;

  if (!cartId) {
    return res.status(400).json({
      message: "Lỗi khi cập nhật giỏ hàng",
    });
  }

  try {
    const originalOrder = await OrderModel.findById(cartId);

    const updatedOrder = await OrderModel.findByIdAndUpdate(cartId, req.body, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    const paymentStatusChangedToPaid =
      originalOrder?.payment_status !== "paid" &&
      updatedOrder?.payment_status === "paid";

    if (paymentStatusChangedToPaid) {
      const customerId = updatedOrder.customerId;
      const totalPrice = updatedOrder.totalPrice;

      const customer = await CustomerModel.findById(customerId);

      const currentBalanceIncreases = customer?.balance_increases || 0;
      const currentBalanceDecreases = customer?.balance_decreases || 0;
      const remainingDecreases =
        Number(currentBalanceIncreases) - Number(currentBalanceDecreases);
      const updatedBalanceDecreases =
        Number(currentBalanceDecreases) + Number(totalPrice);
      const updatedRemainingDecreases = Math.max(
        remainingDecreases - totalPrice,
        0
      );
      await CustomerModel.findByIdAndUpdate(customerId, {
        balance_decreases: updatedBalanceDecreases,
        remaining_decreases: updatedRemainingDecreases,
        ending_balance: updatedRemainingDecreases,
      });

      for (const product of updatedOrder.products) {
        await ProductModel.findByIdAndUpdate(product.productId, {
          $inc: { pendingOrderQuantity: -product.quantity },
        });
      }

      const updatePromises = updatedOrder.products.map(async (productItem) => {
        const product = await ProductModel.findById(productItem.productId);

        if (product) {
          if (product.inventory_number >= productItem.quantity) {
            product.inventory_number -= productItem.quantity;

            await product.updateOne({
              $inc: { inventory_number: -productItem.quantity },
              $push: {
                transactionHistory: {
                  orderId: updatedOrder._id,
                  quantity: productItem.quantity,
                  generalId: updatedOrder.generalId,
                  staffId: updatedOrder.userId,
                  inventory_number: product.inventory_number,
                },
              },
            });
          } else {
            throw new Error(
              `Insufficient stock for product ${product.name_product}`
            );
          }
        } else {
          throw new Error(`Product not found: ${productItem.productId}`);
        }
      });

      await Promise.all(updatePromises);
    }

    if (paymentStatusChangedToPaid) {
      await OrderModel.findByIdAndUpdate(updatedOrder?._id, {
        $inc: { totalPrice: -updatedOrder?.totalPrice },
      });
    }

    const transactionHistory = new TransactionModel({
      transaction_type: "order",
      transaction_date: Date.now(),
      orderId: updatedOrder?._id,
    });

    await transactionHistory.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const cartId = req.params.id;

  if (!cartId) {
    return res.status(400).json({
      message: "Lỗi khi xóa giỏ hàng",
    });
  }

  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(cartId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    const customerId = deletedOrder.customerId;
    const orderTotalPrice = deletedOrder.totalPrice; // Get the order's total price

    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
      throw new Error(`Customer not found: ${customerId}`);
    }

    const updatedBalanceIncreases = Math.max(
      customer.balance_increases - orderTotalPrice,
      0
    );
    const updatedRemainingDecreases =
      customer.opening_balance +
      updatedBalanceIncreases -
      customer.balance_decreases;
    const updatedEndingBalance = updatedRemainingDecreases;

    await CustomerModel.findByIdAndUpdate(customerId, {
      balance_increases: updatedBalanceIncreases,
      remaining_decreases: updatedRemainingDecreases,
      ending_balance: updatedEndingBalance,
    });

    if (deletedOrder.payment_status === "unpaid") {
      for (const product of deletedOrder.products) {
        await ProductModel.findByIdAndUpdate(product.productId, {
          $inc: { pendingOrderQuantity: -product.quantity },
        });
      }
    }

    res.status(200).json({
      message: "Sản phẩm đã được xóa khỏi giỏ hàng.",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getDetailOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const order = await OrderModel.findById(orderId)
      .populate({
        path: "customerId",
        select:
          "username code address phone city district ward specific_address",
      })
      .populate({
        path: "partnerId",
        select: "username code address phone ",
      })
      .populate({
        path: "userId",
        select: "username ",
      })
      .populate({
        path: "generalId",
        select: "name ",
      })
      .populate({
        path: "products.productId",
        select: "",
      })
      .select("");
    if (!order) {
      return res.status(400).json({ message: "orderId not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getIncomeOrders = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const incomeData = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          payment_status: "paid",
        },
      },
      {
        $project: {
          _id: {
            $dateToString: { format: "%d/%m", date: "$createdAt" },
          },
          month: {
            $month: "$createdAt",
          },

          totalPrice: {
            $cond: [
              { $eq: ["$payment_status", "paid"] },
              "$totalCustomerPay",
              0,
            ],
          },
          total_orders: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id",
          month: { $first: "$month" },
          total_income: { $sum: "$totalPrice" },
          total_orders: { $sum: "$total_orders" },
        },
      },
    ]);

    const statusData = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $group: {
          _id: "$order_status",
          count: { $sum: 1 },
        },
      },
    ]);

    const response = {
      incomeData,
      statusData: statusData.map((item) => ({
        status: item._id,
        count: item.count,
      })),
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching income and status data" });
  }
};

const getRevenueOrdersMonth = async (req: Request, res: Response) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const incomeData = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          payment_status: "paid",
        },
      },
      {
        $project: {
          _id: {
            $dateToString: { format: "%m/%Y", date: "$createdAt" },
          },
          month: {
            $month: "$createdAt",
          },

          totalPrice: {
            $cond: [
              { $eq: ["$payment_status", "paid"] },
              "$totalCustomerPay",
              0,
            ],
          },
          total_orders: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id",
          month: { $first: "$month" },
          total_income: { $sum: "$totalPrice" },
          total_orders: { $sum: "$total_orders" },
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const statusData = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $group: {
          _id: "$order_status",
          count: { $sum: 1 },
        },
      },
    ]);

    const response = {
      incomeData,
      statusData: statusData.map((item) => ({
        status: item._id,
        count: item.count,
      })),
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching income and status data" });
  }
};

const getRevenueOrdersStaff = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: previousMonth },
          payment_status: "paid",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $unwind: "$users",
      },

      {
        $project: {
          _id: {
            _id: "$users._id",
            username: "$users.username",
            email: "$users.email",
            month: { $month: "$createdAt" },
          },
          total_quantity: {
            $sum: 1,
          },
          total_price: {
            $sum: "$totalCustomerPay",
          },
        },
      },

      {
        $group: {
          _id: "$_id._id",
          email: { $first: "$_id.email" },
          username: { $first: "$_id.username" },

          total_quantity: { $sum: "$total_quantity" },
          total_price: { $sum: "$total_price" },
        },
      },
    ];

    const results = await OrderModel.aggregate(pipeline);

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching warehouse statistics" });
  }
};

const getIncomeOrdersGeneral = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "generalId",
          as: "orders",
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $project: {
          _id: {
            general: "$orders.generalId",
            month: { $month: "$createdAt" },
          },
          count: {
            $first: "$orders.products.quantity",
          },
          totalPrice: {
            $cond: [
              { $eq: ["$orders.payment_status", "paid"] },
              "$orders.totalPrice",
              0,
            ],
          },
        },
      },
      {
        $group: {
          _id: "$_id.general",
          month: { $first: "$_id.month" },
          total_products: { $sum: "$count" },
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ];

    const results = await GeneralDepotModel.aggregate(pipeline);

    const enrichedResults = [];
    for (const result of results) {
      const warehouseId = result._id;
      const warehouse = await GeneralDepotModel.findById(warehouseId);

      if (warehouse) {
        const enrichedResult = {
          ...result,
          name: warehouse.name,
          type: warehouse.type,
        };
        enrichedResults.push(enrichedResult);
      }
    }

    res.status(200).json(enrichedResults);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching income data" });
  }
};

const getIncomeOrdersCustomer = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const pineline = [
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },

      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders",
        },
      },
      {
        $unwind: "$orders",
      },

      {
        $lookup: {
          from: "products",
          localField: "orders.products.productId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },

      {
        $project: {
          _id: {
            month: { $month: "$createdAt" },
            customer: "$orders.customerId",
          },
          quantity: {
            $first: "$orders.products.quantity",
          },

          totalPrice: "$orders.totalPrice",
        },
      },
      {
        $group: {
          _id: "$_id.customer",
          total_quantity: { $sum: "$quantity" },
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ];

    const results = await CustomerModel.aggregate(pineline);

    const enrichedResults = [];

    for (const result of results) {
      const customerId = result._id;

      const customer = await CustomerModel.findById(customerId);

      if (customer) {
        const enrichedResult = {
          ...result,
          name: customer.username,
        };

        enrichedResults.push(enrichedResult);
      }
    }

    res.status(200).json(enrichedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching income data by customer" });
  }
};

const getIncomeOrdersProduct = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const pineline = [
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },

      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders",
        },
      },
      {
        $unwind: "$orders",
      },

      {
        $lookup: {
          from: "products",
          localField: "orders.products.productId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },

      {
        $project: {
          _id: {
            month: { $month: "$createdAt" },
            customer: "$orders.customerId",
          },
          quantity: {
            $first: "$orders.products.quantity",
          },

          totalPrice: "$orders.totalCustomerPay",
          productName: "$products.name_product",
          productId: "$products._id",
          productCode: "$products.code",
        },
      },

      {
        $group: {
          _id: "$_id.customer",
          productId: { $first: "$productId" },
          total_quantity: { $sum: "$quantity" },
          totalPrice: { $sum: "$totalPrice" },
          product_name: { $first: "$productName" },
          product_code: { $first: "$productCode" },
        },
      },
    ];

    const results = await CustomerModel.aggregate(pineline);

    const enrichedResults = [];

    for (const result of results) {
      const customerId = result._id;

      const customer = await CustomerModel.findById(customerId);

      if (customer) {
        const enrichedResult = {
          ...result,
          name: customer.username,
          code: customer.code,
        };

        enrichedResults.push(enrichedResult);
      }
    }

    res.status(200).json(enrichedResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching income data by customer" });
  }
};

const getIncomeOrdersArea = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const results = await CustomerModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders",
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $project: {
          _id: {
            month: { $month: "$createdAt" },
            city: "$city",
          },
          totalPrice: "$orders.totalCustomerPay",
        },
      },
      {
        $group: {
          _id: "$_id.city",
          totalCustomers: { $sum: 1 },
          totalOrders: { $sum: 1 },
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching income data by location" });
  }
};

const getIncomeOrdersCustomerGroup = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const results = await CustomerModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders",
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $project: {
          _id: {
            month: { $month: "$createdAt" },
            type: "$type",
          },
          totalPrice: "$orders.totalCustomerPay",
        },
      },
      {
        $group: {
          _id: "$_id.type",
          totalCustomers: { $sum: 1 },
          totalOrders: { $sum: 1 },
          totalPrice: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching income data by location" });
  }
};

const searchOrder = async (req: Request, res: Response) => {
  const status = req.query.status as string;
  const keyword = req.query.keyword as string;

  try {
    const payment = new RegExp(status, "i");
    const order = new RegExp(keyword, "i");
    const results = await OrderModel.find({
      payment_status: payment,
      order_status: order,
    });

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const searchDateOrders = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  try {
    let parsedStartDate: Date | null = null;
    let parsedEndDate: Date | null = null;

    if (startDate && endDate) {
      parsedStartDate = new Date(startDate.toString());
      parsedEndDate = new Date(endDate.toString());

      if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        throw new Error(
          "Invalid date format. Dates should be in YYYY-MM-DD format."
        );
      }

      if (parsedStartDate > parsedEndDate) {
        throw new Error("Start date must be before end date.");
      }
    }

    const query: any = {};

    if (parsedStartDate && parsedEndDate) {
      query.received_date = { $gte: parsedStartDate, $lte: parsedEndDate };
    }

    const populatedOrders = await OrderModel.find(query)
      .populate({
        path: "partnerId",
        select: "username phone address",
      })
      .populate({
        path: "customerId",
        select: "username code address phone createdAt",
      })
      .catch((error) => {
        console.error("Error during population:", error);
      });

    return res.status(200).json(populatedOrders);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred during order search.",
    });
  }
};

export {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getDetailOrder,
  getIncomeOrders,
  getRevenueOrdersMonth,
  getRevenueOrdersStaff,
  searchOrder,
  searchDateOrders,
  getIncomeOrdersGeneral,
  getIncomeOrdersCustomer,
  getIncomeOrdersProduct,
  getIncomeOrdersArea,
  getIncomeOrdersCustomerGroup,
};
