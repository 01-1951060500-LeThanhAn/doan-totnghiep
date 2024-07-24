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
const createReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, products } = req.body;
        if (!customerId || products.length === 0) {
            return res.status(400).json("Missing customerId or orderId");
        }
        const customer = yield CustomerModel_1.default.findById(customerId);
        if (!customer) {
            return res.status(400).json("Customer not found");
        }
        const productUpdates = products === null || products === void 0 ? void 0 : products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const { totalPrice, orderId } = product;
            if (!orderId || !totalPrice) {
                return res.status(400).json({ message: "Missing receipt  details" });
            }
            const currentBalanceIncreases = parseFloat(customer === null || customer === void 0 ? void 0 : customer.balance_increases) || 0;
            const currentBalanceDecreases = parseFloat(customer === null || customer === void 0 ? void 0 : customer.balance_decreases) || 0;
            const remainingDecreases = Math.max(currentBalanceIncreases - currentBalanceDecreases, 0);
            const updatedBalanceDecreases = currentBalanceDecreases + parseFloat(totalPrice);
            const updatedRemainingDecreases = Math.max(remainingDecreases - totalPrice, 0);
            yield CustomerModel_1.default.findByIdAndUpdate(customerId, {
                balance_decreases: updatedBalanceDecreases,
                remaining_decreases: updatedRemainingDecreases,
                ending_balance: updatedRemainingDecreases,
            });
            yield OrderModel_1.default.findByIdAndUpdate(orderId, {
                $inc: { totalPrice: -totalPrice },
            });
        }));
        yield Promise.all([productUpdates]);
        let totalPrice = 0;
        for (const product of products) {
            const productData = yield OrderModel_1.default.findById(product.orderId);
            if (!productData) {
                return res
                    .status(400)
                    .json({ message: `Product not found: ${product.orderId}` });
            }
            totalPrice = products.reduce((acc, product) => acc + Number(product.totalPrice), 0);
        }
        const receiptOrder = new ReceiptCustomerModel_1.default(Object.assign(Object.assign({}, req.body), { customerId: customer._id, total: totalPrice }));
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
