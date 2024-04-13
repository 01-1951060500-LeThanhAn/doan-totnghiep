import { Request, Response } from "express";
import ImportOrderModel from "../model/ImportOrderModel";
import WarehouseModel from "../model/WarehouseModel";
import ProductModel from "../model/ProductModel";

const createImportOrder = async (req: Request, res: Response) => {
  const {
    supplierId,
    productId,
    inventory_number,
    import_price,
    code,
    received_date,
  } = req.body;
  try {
    const newImportOrder = new ImportOrderModel({
      code: code,
      supplierId: supplierId,
      productId: productId,
      inventory_number: inventory_number,
      import_price: import_price,
      total_price: inventory_number * import_price,
      payment_status: "pending",
      order_status: "not-entered",
      received_date: received_date,
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
      "productId supplierId"
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

    await ProductModel.findOneAndUpdate(
      { _id: order.productId },
      { $inc: { inventory_number: order?.inventory_number } },
      { upsert: true, new: true }
    );

    const newWarehouseEntry = new WarehouseModel({
      inventory_number: order.inventory_number,
      import_price: order.import_price,
      totalPrice: order.import_price * order.inventory_number,
      productId: order.productId,
      supplierId: order.supplierId,
      payment_status: order.payment_status,
    });

    await newWarehouseEntry.save();

    res.status(200).json({
      message: "Order updated successfully",
      newWarehouseEntry,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
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
      "productId supplierId"
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
