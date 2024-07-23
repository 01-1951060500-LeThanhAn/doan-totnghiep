import { Request, Response } from "express";
import SupplierModel from "../model/SupplierModel";
import WarehouseModel from "../model/WarehouseModel";
import ReceiptSupplierModel from "../model/ReceiptSupplierModel";
const createReceiptSupplier = async (req: Request, res: Response) => {
  try {
    const { supplierId, products } = req.body;

    if (!supplierId || products.length === 0) {
      return res.status(400).json("Missing supplierId or warehouseId");
    }
    const supplier = await SupplierModel.findById(supplierId);
    if (!supplier) {
      return res.status(400).json("Supplier not found");
    }
    const productUpdates = products?.map(async (product: any) => {
      const { totalPrice, warehouseId } = product;

      if (!warehouseId || !totalPrice) {
        return res.status(400).json({ message: "Missing receipt  details" });
      }

      const currentBalanceIncreases = supplier?.balance_increases || 0;
      const currentBalanceDecreases = supplier?.balance_decreases || 0;
      const remainingDecreases =
        currentBalanceIncreases - currentBalanceDecreases;
      const updatedBalanceDecreases = currentBalanceDecreases + totalPrice;
      const updatedRemainingDecreases = Math.max(
        remainingDecreases - totalPrice,
        0
      );
      await SupplierModel.findByIdAndUpdate(supplierId, {
        balance_decreases: updatedBalanceDecreases,
        remaining_decreases: updatedRemainingDecreases,
        ending_balance: updatedRemainingDecreases,
      });

      await WarehouseModel.findByIdAndUpdate(warehouseId, {
        $inc: { totalPrice: -totalPrice },
      });
    });

    await Promise.all([productUpdates]);

    let totalPrice = 0;

    for (const product of products) {
      const productData = await WarehouseModel.findById(product.warehouseId);
      if (!productData) {
        return res
          .status(400)
          .json({ message: `Product not found: ${product.warehouseId}` });
      }

      totalPrice = products.reduce(
        (acc: number, product: any) => acc + Number(product.totalPrice),
        0
      );
    }

    const receiptOrder = new ReceiptSupplierModel({
      ...req.body,
      supplierId: supplier._id,
      total: totalPrice,
    });

    await receiptOrder.save();
    return res.status(200).json(receiptOrder);
  } catch (error: any) {
    res.status(500).json("Server error: " + error.message);
  }
};

const getReceiptSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await ReceiptSupplierModel.find().populate("supplierId");
    res.status(200).json(supplier);
  } catch (error: any) {
    res.status(500).json("Server error: " + error.message);
  }
};

const deleteReceiptSupplier = async (req: Request, res: Response) => {
  const receiptId = req.params.id;

  if (!receiptId) {
    return res.status(400).json({
      message: "Lỗi ID phiếu thu",
    });
  }

  try {
    const receipt = await ReceiptSupplierModel.findByIdAndDelete(receiptId);
    if (!receipt) {
      return res.status(400).json({
        message: "Không thể xóa phiếu thu ",
      });
    }

    res.status(200).json("Phiếu thu đã được xóa.");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getInfoReceiptSupplier = async (req: Request, res: Response) => {
  const receiptId = req.params.id;
  if (!receiptId) {
    return res.status(400).json({
      message: "ID Receipt not found",
    });
  }

  try {
    const receipt = await ReceiptSupplierModel.findById(receiptId)
      .populate("supplierId staffId")
      .populate({
        path: "products.warehouseId",
        select: "products code",
        populate: {
          path: "products.productId",
        },
      });
    if (!receipt) {
      return res.status(400).json({
        message: "Receipt not found",
      });
    }

    res.status(200).json(receipt);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {
  createReceiptSupplier,
  getReceiptSupplier,
  deleteReceiptSupplier,
  getInfoReceiptSupplier,
};
