import { Request, Response } from "express";
import OrderModel from "../model/OrderModel";
import CustomerModel from "../model/CustomerModel";
import ProductModel from "../model/ProductModel";

const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.body.customerId;

    if (!customerId) {
      return res.status(400).json({ message: "customerId is required" });
    }

    const customer = await CustomerModel.findById(customerId);

    if (!customer) {
      return res.status(400).json({ message: "customerId not found" });
    }

    const newOrder = new OrderModel({
      ...req.body,
      customerId: customer._id,
      payment_status: "unpaid",
    });

    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const carts = await OrderModel.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
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
      .populate("customerId products.productId partnerId")
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
    const [incomeData, statusData] = await Promise.all([
      OrderModel.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
          },
        },
        {
          $project: {
            _id: null,
            month: { $month: "$createdAt" },
            total_price: "$total_price",
            total_sold_products: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id",
            month: { $first: "$month" },
            total_income: { $sum: "$total_price" },
            total_sold_products: { $sum: "$total_sold_products" },
          },
        },
      ]),
      OrderModel.aggregate([
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
      ]),
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
    res.status(500).json({ message: "Error fetching income and status data" }); // Send a user-friendly error message
  }
};

export {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getDetailOrder,
  getIncomeOrders,
};
