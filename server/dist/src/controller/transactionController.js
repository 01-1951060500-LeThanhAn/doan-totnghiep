"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTransaction = exports.deleteTransaction = exports.getDetailTransaction = exports.getAllTransactions = void 0;
const TransactionModel_1 = __importDefault(require("../model/TransactionModel"));
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield TransactionModel_1.default.find()
            .populate({
            path: "orderId",
            select: " totalPrice received_date totalQuantity code order_status payment_status",
        })
            .populate({
            path: "warehouseId",
            select: "code delivery_date totalQuantity order_status payment_status totalPrice",
            populate: {
                path: "products.productId",
                select: "name_product",
            },
        })
            .populate({
            path: "shipId",
        });
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllTransactions = getAllTransactions;
const getDetailTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.id;
    if (!transactionId) {
        return res.status(400).json({ msg: "Transaction ID is required" });
    }
    try {
        const transaction = yield TransactionModel_1.default.findById(req.params.id).populate("orderId");
        if (!transaction) {
            return res.status(400).json({ msg: "Transaction not found" });
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getDetailTransaction = getDetailTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.id;
    if (!transactionId) {
        return res.status(400).json({ msg: "Transaction ID is required" });
    }
    try {
        const transactionIndex = yield TransactionModel_1.default.findByIdAndDelete(transactionId);
        if (!transactionIndex) {
            return res.status(400).json({ msg: "Transaction not found" });
        }
        return res.status(200).json({ msg: "Transaction deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.deleteTransaction = deleteTransaction;
const deleteAllTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield TransactionModel_1.default.deleteMany({}).then((results) => {
            if (results.deletedCount === 0) {
                res.status(400).json("List transaction is empty");
            }
            return res.status(200).json({
                msg: `Transactions deleted`,
            });
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error deleting transactions" });
    }
});
exports.deleteAllTransaction = deleteAllTransaction;
