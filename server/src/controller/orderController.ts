import { Request, Response } from "express";
import OrderModel from "../model/OrderModel";
import CustomerModel from "../model/CustomerModel";
import ProductModel from "../model/ProductModel";
import GeneralDepotModel from "../model/GeneralDepotModel";
import TransactionModel from "../model/TransactionModel";

const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.body.customerId;
    const userId = req.body.userId;
    const products = req.body.products;
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

    const newOrder = new OrderModel({
      ...req.body,
      customerId: customer._id,
      userId,
      totalQuantity,
      payment_status: "unpaid",
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
      orders = await OrderModel.find().populate("userId");
    } else if (user?.role?.name === "manager") {
      orders = await OrderModel.find({ userId: user._id }).populate("userId");
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

    const paymentStatusChangedToPaid =
      originalOrder?.payment_status !== "paid" &&
      updatedOrder?.payment_status === "paid";

    if (paymentStatusChangedToPaid) {
      let insufficientStock = false;

      for (const product of updatedOrder.products) {
        const foundProduct = await ProductModel.findById(product.productId);

        if (foundProduct && foundProduct.inventory_number >= product.quantity) {
          foundProduct.inventory_number -= product.quantity;
          await foundProduct.save();
        } else {
          insufficientStock = true;
          console.error(
            "Lỗi: Sản phẩm",
            product.productId,
            "không đủ hàng trong kho"
          );
        }
      }

      if (insufficientStock) {
        return res
          .status(400)
          .json({ message: "Lỗi: Không đủ số lượng sản phẩm trong kho" });
      }

      const transactionHistory = new TransactionModel({
        transaction_type: "order",
        transaction_date: Date.now(),
        orderId: updatedOrder._id,
      });

      await transactionHistory.save();
    }

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
    const order = await OrderModel.findByIdAndDelete(cartId);
    const customers = await CustomerModel.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders",
        },
      },
      {
        $match: {
          "orders._id": { $in: [cartId] },
        },
      },
    ]);

    res.status(200).json({
      message: "Sản phẩm đã được xóa khỏi giỏ hàng.",
      customers,
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
            $cond: [{ $eq: ["$payment_status", "paid"] }, "$totalPrice", 0],
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

          totalPrice: "$orders.totalPrice",
          productName: "$products.name_product",
          productCode: "$products.code",
        },
      },
      {
        $group: {
          _id: "$_id.customer",
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

const searchOrder = async (req: Request, res: Response) => {
  const keyword = req.query.keyword as string;

  try {
    const titleReg = new RegExp(keyword, "i");

    const results = await OrderModel.find({
      order_status: titleReg,
    });

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server not found!",
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
  searchOrder,
  getIncomeOrdersGeneral,
  getIncomeOrdersCustomer,
  getIncomeOrdersProduct,
};
