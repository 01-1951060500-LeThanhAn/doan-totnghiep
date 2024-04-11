import { Request, Response } from "express";
import SupplierModel from "../model/SupplierModel";
import WarehouseModel from "../model/WarehouseModel";

const createSupplier = async (req: Request, res: Response) => {
  const suppliers = new SupplierModel({
    ...req.body,
  });

  try {
    await suppliers.save();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getListSuppliers = async (req: Request, res: Response) => {
  try {
    const users = await SupplierModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDetailSupplier = async (req: Request, res: Response) => {
  const supplierId = req.params.id;

  try {
    const supplier = await WarehouseModel.find({ supplierId }).populate(
      "productId supplierId"
    );

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.status(200).json(supplier);
  } catch (error) {
    console.error("Error fetching supplier details:", error);
    res.status(500).json({ message: "Error fetching supplier details" });
  }
};

const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateSupplier = await SupplierModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    await updateSupplier?.save();
    res.json(updateSupplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi cập nhật nhà cung cấp",
    });
  }
};

const deleteSupplier = async (req: Request, res: Response) => {
  const supplierId = req.params.id;

  try {
    const deleteSupplierId = await SupplierModel.findByIdAndDelete(supplierId);

    if (!deleteSupplierId) {
      return res.status(401).json({
        message: "Mã nhà cung cấp không hợp lệ hoặc không tồn tại",
      });
    }

    res.status(200).json({
      message: "Xóa nhà cung cấp thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi xóa nhà cung cấp",
    });
  }
};

export {
  createSupplier,
  getListSuppliers,
  updateSupplier,
  deleteSupplier,
  getDetailSupplier,
};
