import { Request, Response } from "express";
import ProductModel from "../model/ProductModel";
import WarehouseModel from "../model/WarehouseModel";

const createWareHouse = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      inventory_number,
      import_price,
      supplierId,
      payment_status,
    } = req.body;

    if (!productId || !supplierId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    await ProductModel.findOneAndUpdate(
      { _id: productId },
      { $inc: { inventory_number: inventory_number } },
      { upsert: true, new: true }
    );

    const totalPrice = inventory_number * import_price;

    const warehouse = new WarehouseModel({
      productId: product._id,
      inventory_number,
      import_price,
      totalPrice,
      payment_status,
      supplierId,
    });

    await warehouse.save();
    res.status(200).json(warehouse);
  } catch (error) {
    console.error("Error creating warehouse entry:", error);
    res.status(500).json(error);
  }
};

const getWareHouse = async (req: Request, res: Response) => {
  try {
    const warehouse = await WarehouseModel.find().populate(
      "supplierId productId"
    );

    return res.status(200).json(warehouse);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteWarehouse = async (req: Request, res: Response) => {
  const warehouseId = req.params.id;

  try {
    const deleteProductId = await WarehouseModel.findByIdAndDelete(warehouseId);

    if (!deleteProductId) {
      return res.status(401).json({
        message: "Mã đơn nhập hàng không hợp lệ hoặc không tồn tại",
      });
    }

    res.status(200).json({
      message: "Xóa đơn nhập hàng thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi xóa đơn nhập hàng",
    });
  }
};

export { createWareHouse, getWareHouse, deleteWarehouse };
