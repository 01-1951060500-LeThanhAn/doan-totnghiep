import { Request, Response } from "express";
import ImportOrderModel from "../model/ImportOrderModel";
import WarehouseModel from "../model/WarehouseModel";
import ProductModel from "../model/ProductModel";

const createImportOrder = async (req: Request, res: Response) => {
  try {
    const newImportOrder = new ImportOrderModel({
      ...req.body,
    });
    await newImportOrder.save();
    res.status(200).json(newImportOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllOrderImport = async (req: Request, res: Response) => {
  try {
    const orders = await ImportOrderModel.find().populate(
      "products.productId supplierId"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateImportOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    if (!orderId) return res.status(404).json("Đơn đặt hàng này không tồn tại");

    const order = await ImportOrderModel.findByIdAndUpdate(
      orderId,
      {
        order_status: "entered",
      },
      { new: true }
    );

    if (!order) {
      throw new Error("Order not found");
    }

    const productUpdates = order.products.map(async (product: any) => {
      const { productId, inventory_number } = product;

      if (!productId || !inventory_number) {
        return res.status(400).json({ message: "Missing product details" });
      }

      await ProductModel.findOneAndUpdate(
        { _id: productId },
        { $inc: { inventory_number } },
        { upsert: true, new: true }
      );
    });

    await Promise.all(productUpdates);

    const totalPrice = order.import_price * order.products[0].inventory_number; // Assuming all products have the same import price

    const newWarehouseEntry = new WarehouseModel({
      inventory_number: order.products[0].inventory_number,
      import_price: order.import_price,
      totalPrice,
      productId: order.products[0].productId,
      supplierId: order.supplierId,
      payment_status: order.payment_status,
    });

    await newWarehouseEntry.save();

    res.status(200).json({
      message: "Order updated successfully",
      newWarehouseEntry,
    });
  } catch (error) {
    console.error("Error creating warehouse entry:", error);
    res.status(500).json({
      message: "Server not found",
    });
  }
};

const getDetailImportOrder = async (req: Request, res: Response) => {
  const orderImportId = req.params.id;

  if (!orderImportId) {
    return res.status(404).json("Đơn đặt hàng này không tồn tại");
  }

  try {
    const data = await ImportOrderModel.findById(orderImportId).populate(
      "products.productId supplierId"
    );
    if (!data) {
      return res.status(404).json({
        message: "Đơn đặt hàng này không tồn tại",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export {
  createImportOrder,
  getAllOrderImport,
  updateImportOrder,
  getDetailImportOrder,
};
