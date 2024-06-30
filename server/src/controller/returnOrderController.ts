import { Request, Response } from "express";
import OrderModel from "../model/OrderModel";
import ReturnOrderModel from "../model/ReturnOrderModel";
import ProductModel from "../model/ProductModel";

const createReturnOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, products } = req.body;
    if (!orderId || !products) {
      return res.status(400).json({ message: "Missing required details" });
    }

    for (let product of products) {
      const productId = product.productId;
      const data = await ProductModel.findById(product.productId);
      if (!data) {
        return res
          .status(400)
          .json({ message: `Product not found: ${product.productId}` });
      }

      await ProductModel.findByIdAndUpdate(productId, {
        $inc: { inventory_number: product.quantity },
      });

      await OrderModel.findByIdAndUpdate(orderId, {
        $inc: { totalReturnOrders: product.quantity },
      });
    }

    const returnOrders = new ReturnOrderModel({
      ...req.body,
      orderId,
      return_reason: req.body.return_reason,
      products,
    });
    await returnOrders.save();

    res.status(200).json(returnOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getReturnOrder = async (req: Request, res: Response) => {
  try {
    const returnOrders = await ReturnOrderModel.find();
    return res.status(200).json(returnOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDetailReturnOrder = async (req: Request, res: Response) => {
  const returnOrderId = req.params.id;

  if (!returnOrderId) {
    return res.status(400).json({ message: "Id Return Order not found" });
  }

  try {
    const returnOrder = await ReturnOrderModel.findById(returnOrderId).populate(
      "customerId generalId orderId products.productId"
    );

    if (!returnOrder) {
      return res.status(404).json({ message: "Return Order not found" });
    }

    res.status(200).json(returnOrder);
  } catch (error) {
    res.status(500).json({ message: "Error fetching return order details" });
  }
};

const deleteReturnOrder = async (req: Request, res: Response) => {
  const returnOrderId = req.params.id;
  if (!returnOrderId) {
    return res.status(400).json({ message: "Id Return Order not found" });
  }

  try {
    const returnOrder = await ReturnOrderModel.findByIdAndDelete(returnOrderId);
    if (!returnOrder) {
      return res.status(400).json({ message: "Return Order not found" });
    }

    return res
      .status(200)
      .json({ message: "Return Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateReturnOrders = async (req: Request, res: Response) => {
  const returnOrderId = req.params.id;
  if (!returnOrderId) {
    return res.status(400).json({ message: "Id Return Order not found" });
  }

  try {
    const updatedReturnOrderData = await ReturnOrderModel.findByIdAndUpdate(
      returnOrderId,
      {
        refund_status: "refunded",
      },
      {
        new: true,
      }
    );

    if (!updatedReturnOrderData) {
      return res.status(404).json({ message: "Không tìm thấy đơn trả hàng" });
    }

    const order = await OrderModel.findById(updatedReturnOrderData?.orderId);

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    for (let results of updatedReturnOrderData?.products) {
      const updatedReturnOrders = order?.products.map(async (item) => {
        const matchingProductIndex = order.products.findIndex(
          (p) => results.productId === item.productId
        );

        if (matchingProductIndex !== -1) {
          order.products[matchingProductIndex].quantity -=
            item.totalReturnOrders;
        }

        await order.save();
      });
      await Promise.all(updatedReturnOrders);
    }

    res.status(200).json(updatedReturnOrderData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getIncomeReturnOrderByProduct = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const incomeData = await ReturnOrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          _id: "$products._id",
          productName: "$products.name_product",
          productCode: "$products.code",
          img: "$products.img",
          price: "$products.export_price",
          totalOrders: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id",
          name_product: { $first: "$productName" },
          code: { $first: "$productCode" },
          price: { $first: "$price" },
          img: { $first: "$img" },
          totalOrders: { $sum: "$totalOrders" },
        },
      },
    ]);

    return res.status(200).json(incomeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  createReturnOrder,
  getReturnOrder,
  getDetailReturnOrder,
  deleteReturnOrder,
  updateReturnOrders,
  getIncomeReturnOrderByProduct,
};
