import { Request, Response } from "express";
import ReceiptModel from "../model/ReceiptModel";
import CustomerModel from "../model/CustomerModel";

const createReceipt = async (req: Request, res: Response) => {
  try {
    const { customerId, totalPrice } = req.body;

    if (!customerId || !totalPrice) {
      return res.status(400).json("Missing customerId or totalPrice");
    }
    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
      return res.status(400).json("Customer not found");
    }
    const currentBalanceIncreases = customer?.balance_increases || 0;
    const currentBalanceDecreases = customer?.balance_decreases || 0;
    const remainingDecreases =
      currentBalanceIncreases - currentBalanceDecreases;
    const updatedBalanceDecreases = currentBalanceDecreases + totalPrice;
    const updatedRemainingDecreases = Math.max(
      remainingDecreases - totalPrice,
      0
    );
    await CustomerModel.findByIdAndUpdate(customerId, {
      balance_decreases: updatedBalanceDecreases,
      remaining_decreases: updatedRemainingDecreases,
      ending_balance: updatedRemainingDecreases,
    });

    const receiptOrder = new ReceiptModel({
      ...req.body,
      customerId: customer._id,
      totalPrice,
    });

    await receiptOrder.save();
    return res.status(200).json(receiptOrder);
  } catch (error: any) {
    res.status(500).json("Server error: " + error.message);
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

export { createReceipt, getReceipt, deleteReceipt };
