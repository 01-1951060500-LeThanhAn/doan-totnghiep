import { Request, Response } from "express";
import TransactionModel from "../model/TransactionModel";

const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await TransactionModel.find()
      .populate({
        path: "orderId",
        select:
          " total_price received_date totalQuantity code order_status payment_status",
      })
      .populate({
        path: "warehouseId",
        select:
          "code delivery_date totalQuantity order_status payment_status totalPrice",
        populate: {
          path: "products.productId",
          select: "name_product",
        },
      })
      .populate({
        path: "shipId",
      });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDetailTransaction = async (req: Request, res: Response) => {
  const transactionId = req.params.id;

  if (!transactionId) {
    return res.status(400).json({ msg: "Transaction ID is required" });
  }
  try {
    const transaction = await TransactionModel.findById(req.params.id).populate(
      "orderId"
    );
    if (!transaction) {
      return res.status(400).json({ msg: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req: Request, res: Response) => {
  const transactionId = req.params.id;

  if (!transactionId) {
    return res.status(400).json({ msg: "Transaction ID is required" });
  }

  try {
    const transactionIndex = await TransactionModel.findByIdAndDelete(
      transactionId
    );

    if (!transactionIndex) {
      return res.status(400).json({ msg: "Transaction not found" });
    }

    return res.status(200).json({ msg: "Transaction deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export { getAllTransactions, getDetailTransaction, deleteTransaction };
