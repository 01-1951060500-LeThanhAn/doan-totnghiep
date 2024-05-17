import { Request, Response } from "express";
import TransactionModel from "../model/TransactionModel";

const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await TransactionModel.find()
      .populate({
        path: "orderId",
        select:
          " totalPrice received_date totalQuantity code order_status payment_status",
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

const deleteAllTransaction = async (req: Request, res: Response) => {
  try {
    await TransactionModel.deleteMany({}).then((results) => {
      if (results.deletedCount === 0) {
        res.status(400).json("List transaction is empty");
      }
      return res.status(200).json({
        msg: `Transactions deleted`,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error deleting transactions" });
  }
};

export {
  getAllTransactions,
  getDetailTransaction,
  deleteTransaction,
  deleteAllTransaction,
};
