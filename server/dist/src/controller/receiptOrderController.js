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
exports.deleteReceipt = exports.getReceipt = exports.createReceipt = void 0;
const ReceiptModel_1 = __importDefault(require("../model/ReceiptModel"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const OrderModel_1 = __importDefault(require("../model/OrderModel"));
const createReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, totalPrice, orderId } = req.body;
        if (!customerId || !totalPrice) {
            return res.status(400).json("Missing customerId or totalPrice");
        }
        const customer = yield CustomerModel_1.default.findById(customerId);
        if (!customer) {
            return res.status(400).json("Customer not found");
        }
        const currentBalanceIncreases = (customer === null || customer === void 0 ? void 0 : customer.balance_increases) || 0;
        const currentBalanceDecreases = (customer === null || customer === void 0 ? void 0 : customer.balance_decreases) || 0;
        const remainingDecreases = currentBalanceIncreases - currentBalanceDecreases;
        const updatedBalanceDecreases = currentBalanceDecreases + totalPrice;
        const updatedRemainingDecreases = Math.max(remainingDecreases - totalPrice, 0);
        yield CustomerModel_1.default.findByIdAndUpdate(customerId, {
            balance_decreases: updatedBalanceDecreases,
            remaining_decreases: updatedRemainingDecreases,
            ending_balance: updatedRemainingDecreases,
        });
        yield OrderModel_1.default.findByIdAndUpdate(orderId, {
            $inc: { totalPrice: -totalPrice },
        });
        const receiptOrder = new ReceiptModel_1.default(Object.assign(Object.assign({}, req.body), { customerId: customer._id, totalPrice }));
        yield receiptOrder.save();
        return res.status(200).json(receiptOrder);
    }
    catch (error) {
        res.status(500).json("Server error: " + error.message);
    }
});
exports.createReceipt = createReceipt;
const getReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield ReceiptModel_1.default.find();
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
        const receipt = yield ReceiptModel_1.default.findByIdAndDelete(receiptId);
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