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
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    const returnOrders = new ReturnOrderModel({
      ...req.body,
      orderId,
      customerId: order.customerId,
      generalId: order.generalId,
      return_reason: req.body.return_reason,
      products,
    });

    for (const product of products) {
      const productId = product.productId;
      const quantityToReturn = product.quantity;

      const data = await ProductModel.findById(product.productId);
      if (!data) {
        return res
          .status(400)
          .json({ message: `Product not found: ${product.productId}` });
      }
      await ProductModel.findByIdAndUpdate(productId, {
        $inc: { inventory_number: quantityToReturn },
      });

      order.totalQuantity -= quantityToReturn;
      await order.save();
    }

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

export { createReturnOrder, getReturnOrder };
