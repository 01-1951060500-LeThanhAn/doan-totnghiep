import { Request, Response } from "express";
import ReceiptModel from "../model/ReceiptCustomerModel";
import CustomerModel from "../model/CustomerModel";
import OrderModel from "../model/OrderModel";
import { Decimal } from "decimal.js";

const createReceipt = async (req: Request, res: Response) => {
  try {
    const { customerId, products } = req.body;

    if (!customerId || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Missing customerId or products" });
    }

    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    let totalReceiptPrice = new Decimal(0);

    for (const product of products) {
      const { totalPrice, orderId } = product;

      if (!orderId || !totalPrice) {
        return res.status(400).json({ message: "Missing receipt details" });
      }

      const decimalTotalPrice = new Decimal(totalPrice);
      totalReceiptPrice = totalReceiptPrice.plus(decimalTotalPrice);

      const currentBalanceIncreases = new Decimal(
        customer.balance_increases || "0"
      );
      const currentBalanceDecreases = new Decimal(
        customer.balance_decreases || "0"
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

      await CustomerModel.findByIdAndUpdate(customerId, {
        balance_decreases: updatedBalanceDecreases.toString(),
        remaining_decreases: updatedRemainingDecreases.toString(),
        ending_balance: updatedRemainingDecreases.toString(),
      });

      await OrderModel.findByIdAndUpdate(orderId, {
        $inc: { totalPrice: -decimalTotalPrice.toNumber() },
      });
    }

    const receiptOrder = new ReceiptModel({
      ...req.body,
      customerId: customer._id,
      total: totalReceiptPrice.toString(),
    });

    await receiptOrder.save();
    return res.status(200).json(receiptOrder);
  } catch (error: any) {
    console.error("Error creating receipt:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getReceipt = async (req: Request, res: Response) => {
  try {
    const customer = await ReceiptModel.find();
    res.status(200).json(customer);
  } catch (error: any) {
    res.status(500).json("Server error: " + error.message);
  }
};

const deleteReceipt = async (req: Request, res: Response) => {
  const receiptId = req.params.id;

  if (!receiptId) {
    return res.status(400).json({
      message: "Lỗi ID phiếu thu",
    });
  }

  try {
    const receipt = await ReceiptModel.findByIdAndDelete(receiptId);
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

const getInfoReceipt = async (req: Request, res: Response) => {
  const receiptId = req.params.id;
  if (!receiptId) {
    return res.status(400).json({
      message: "ID Receipt not found",
    });
  }

  try {
    const receipt = await ReceiptModel.findById(receiptId)
      .populate("customerId staffId")
      .populate({
        path: "products.orderId",
        select: " code",
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

export { createReceipt, getReceipt, deleteReceipt, getInfoReceipt };
