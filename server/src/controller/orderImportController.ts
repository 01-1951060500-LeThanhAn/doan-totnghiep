import { Request, Response } from "express";
import ImportOrderModel from "../model/ImportOrderModel";
import WarehouseModel from "../model/WarehouseModel";
import ProductModel from "../model/ProductModel";

const createImportOrder = async (req: Request, res: Response) => {
  try {
    const { supplierId, products } = req.body;
    if (!supplierId || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const totalQuantity = products.reduce(
      (acc: number, product: any) => acc + Number(product.inventory_number),
      0
    );

    const newImportOrder = new ImportOrderModel({
      ...req.body,
      totalQuantity,
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
      "products.productId supplierId generalId"
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

    const totalQuantity = order.products.reduce(
      (acc: number, product: any) => acc + Number(product.inventory_number),
      0
    );
    const newWarehouseEntry = new WarehouseModel({
      code: order.code,
      totalQuantity,
      products: order.products,
      delivery_date: order.received_date,
      supplierId: order.supplierId,
      generalId: order.generalId,
      order_status: order.order_status,
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
    const data = await ImportOrderModel.findById(orderImportId)
      .populate("products.productId")
      .populate({
        path: "generalId",
        select: "-createdAt -updatedAt -manager -products -type",
      })
      .populate({
        path: "supplierId",
        select: "-createdAt -updatedAt -desc -userId -tax_code -website",
      });
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

const deleteImportOrder = async (req: Request, res: Response) => {
  const orderImportId = req.params.id;
  if (!orderImportId) {
    return res.status(404).json("Đơn đặt hàng này không tồn tại");
  }

  try {
    const order = await ImportOrderModel.findByIdAndDelete(orderImportId);
    if (!order) {
      return res.status(404).json("Đơn đặt hàng này không tồn tại");
    }
    res.status(200).json("Đã xóa đơn đặt hàng thành công");
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
  deleteImportOrder,
};
