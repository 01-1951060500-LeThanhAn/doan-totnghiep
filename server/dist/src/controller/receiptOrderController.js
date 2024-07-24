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
exports.getInfoReceipt = exports.deleteReceipt = exports.getReceipt = exports.createReceipt = void 0;
const ReceiptCustomerModel_1 = __importDefault(require("../model/ReceiptCustomerModel"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const OrderModel_1 = __importDefault(require("../model/OrderModel"));
const decimal_js_1 = require("decimal.js");
const createReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, products } = req.body;
        if (!customerId || products.length === 0) {
            return res
                .status(400)
                .json({ message: "Missing customerId or products" });
        }
        const customer = yield CustomerModel_1.default.findById(customerId);
        if (!customer) {
            return res.status(400).json({ message: "Customer not found" });
        }
        let totalReceiptPrice = new decimal_js_1.Decimal(0);
        for (const product of products) {
            const { totalPrice, orderId } = product;
            if (!orderId || !totalPrice) {
                return res.status(400).json({ message: "Missing receipt details" });
            }
            const decimalTotalPrice = new decimal_js_1.Decimal(totalPrice);
            totalReceiptPrice = totalReceiptPrice.plus(decimalTotalPrice);
            const currentBalanceIncreases = new decimal_js_1.Decimal(customer.balance_increases || "0");
            const currentBalanceDecreases = new decimal_js_1.Decimal(customer.balance_decreases || "0");
            const remainingDecreases = decimal_js_1.Decimal.max(currentBalanceIncreases.minus(currentBalanceDecreases), new decimal_js_1.Decimal(0));
            const updatedBalanceDecreases = currentBalanceDecreases.plus(decimalTotalPrice);
            const updatedRemainingDecreases = decimal_js_1.Decimal.max(remainingDecreases.minus(decimalTotalPrice), new decimal_js_1.Decimal(0));
            yield CustomerModel_1.default.findByIdAndUpdate(customerId, {
                balance_decreases: updatedBalanceDecreases.toString(),
                remaining_decreases: updatedRemainingDecreases.toString(),
                ending_balance: updatedRemainingDecreases.toString(),
            });
            yield OrderModel_1.default.findByIdAndUpdate(orderId, {
                $inc: { totalPrice: -decimalTotalPrice.toNumber() },
            });
        }
        const receiptOrder = new ReceiptCustomerModel_1.default(Object.assign(Object.assign({}, req.body), { customerId: customer._id, total: totalReceiptPrice.toString() }));
        yield receiptOrder.save();
        return res.status(200).json(receiptOrder);
    }
    catch (error) {
        console.error("Error creating receipt:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.createReceipt = createReceipt;
const getReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield ReceiptCustomerModel_1.default.find();
        res.status(200).json(customer);
    }
    catch (error) {
        res.status(500).json("Server error: " + error.message);
    }
});
exports.getReceipt = getReceipt;
const deleteReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receiptId = req.params.id;
    if (!receiptId) {
        return res.status(400).json({
            message: "Lỗi ID phiếu thu",
        });
    }
    try {
        const receipt = yield ReceiptCustomerModel_1.default.findByIdAndDelete(receiptId);
        if (!receipt) {
            return res.status(400).json({
                message: "Không thể xóa phiếu thu ",
            });
        }
        res.status(200).json("Phiếu thu đã được xóa.");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteReceipt = deleteReceipt;
const getInfoReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receiptId = req.params.id;
    if (!receiptId) {
        return res.status(400).json({
            message: "ID Receipt not found",
        });
    }
    try {
        const receipt = yield ReceiptCustomerModel_1.default.findById(receiptId)
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
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getInfoReceipt = getInfoReceipt;
