import { Request, Response } from "express";
import SupplierModel from "../model/SupplierModel";
import WarehouseModel from "../model/WarehouseModel";
import ReceiptSupplierModel from "../model/ReceiptSupplierModel";
import { Decimal } from "decimal.js";

const createReceiptSupplier = async (req: Request, res: Response) => {
  try {
    const { supplierId, products } = req.body;

    if (!supplierId || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Missing supplierId or products" });
    }

    const supplier = await SupplierModel.findById(supplierId);
    if (!supplier) {
      return res.status(400).json({ message: "Supplier not found" });
    }

    let totalReceiptPrice = new Decimal(0);

    for (const product of products) {
      const { totalPrice, warehouseId } = product;

      if (!warehouseId || !totalPrice) {
        return res.status(400).json({ message: "Missing receipt details" });
      }

      const decimalTotalPrice = new Decimal(totalPrice);
      totalReceiptPrice = totalReceiptPrice.plus(decimalTotalPrice);

      const currentBalanceIncreases = new Decimal(
        supplier.balance_increases || "0"
      );
      const currentBalanceDecreases = new Decimal(
        supplier.balance_decreases || "0"
      );
      const remainingDecreases = Decimal.max(
        currentBalanceIncreases.minus(currentBalanceDecreases),
        new Decimal(0)
      );

      const updatedBalanceDecreases =
        currentBalanceDecreases.plus(decimalTotalPrice);
      const updatedRemainingDecreases = Decimal.max(
        remainingDecreases.minus(decimalTotalPrice),
        new Decimal(0)
      );

      await SupplierModel.findByIdAndUpdate(supplierId, {
        balance_decreases: updatedBalanceDecreases.toString(),
        remaining_decreases: updatedRemainingDecreases.toString(),
        ending_balance: updatedRemainingDecreases.toString(),
      });

      await WarehouseModel.findByIdAndUpdate(warehouseId, {
        $inc: { totalPrice: -decimalTotalPrice.toNumber() },
      });

      const updatedWarehouse = await WarehouseModel.findById(warehouseId);
      if (!updatedWarehouse) {
        return res
          .status(400)
          .json({ message: `Warehouse not found: ${warehouseId}` });
      }
    }

    const receiptOrder = new ReceiptSupplierModel({
      ...req.body,
      supplierId: supplier._id,
      total: totalReceiptPrice.toString(),
    });

    await receiptOrder.save();
    return res.status(200).json(receiptOrder);
  } catch (error: any) {
    console.error("Error creating supplier receipt:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
