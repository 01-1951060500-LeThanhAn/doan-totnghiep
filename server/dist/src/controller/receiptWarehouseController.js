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
exports.getInfoReceiptSupplier = exports.deleteReceiptSupplier = exports.getReceiptSupplier = exports.createReceiptSupplier = void 0;
const SupplierModel_1 = __importDefault(require("../model/SupplierModel"));
const WarehouseModel_1 = __importDefault(require("../model/WarehouseModel"));
const ReceiptSupplierModel_1 = __importDefault(require("../model/ReceiptSupplierModel"));
const decimal_js_1 = require("decimal.js");
const createReceiptSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierId, products } = req.body;
        if (!supplierId || products.length === 0) {
            return res
                .status(400)
                .json({ message: "Missing supplierId or products" });
        }
        const supplier = yield SupplierModel_1.default.findById(supplierId);
        if (!supplier) {
            return res.status(400).json({ message: "Supplier not found" });
        }
        let totalReceiptPrice = new decimal_js_1.Decimal(0);
        for (const product of products) {
            const { totalPrice, warehouseId } = product;
            if (!warehouseId || !totalPrice) {
                return res.status(400).json({ message: "Missing receipt details" });
            }
            const decimalTotalPrice = new decimal_js_1.Decimal(totalPrice);
            totalReceiptPrice = totalReceiptPrice.plus(decimalTotalPrice);
            const currentBalanceIncreases = new decimal_js_1.Decimal(supplier.balance_increases || "0");
            const currentBalanceDecreases = new decimal_js_1.Decimal(supplier.balance_decreases || "0");
            const remainingDecreases = decimal_js_1.Decimal.max(currentBalanceIncreases.minus(currentBalanceDecreases), new decimal_js_1.Decimal(0));
            const updatedBalanceDecreases = currentBalanceDecreases.plus(decimalTotalPrice);
            const updatedRemainingDecreases = decimal_js_1.Decimal.max(remainingDecreases.minus(decimalTotalPrice), new decimal_js_1.Decimal(0));
            yield SupplierModel_1.default.findByIdAndUpdate(supplierId, {
                balance_decreases: updatedBalanceDecreases.toString(),
                remaining_decreases: updatedRemainingDecreases.toString(),
                ending_balance: updatedRemainingDecreases.toString(),
            });
            yield WarehouseModel_1.default.findByIdAndUpdate(warehouseId, {
                $inc: { totalPrice: -decimalTotalPrice.toNumber() },
            });
            const updatedWarehouse = yield WarehouseModel_1.default.findById(warehouseId);
            if (!updatedWarehouse) {
                return res
                    .status(400)
                    .json({ message: `Warehouse not found: ${warehouseId}` });
            }
        }
        const receiptOrder = new ReceiptSupplierModel_1.default(Object.assign(Object.assign({}, req.body), { supplierId: supplier._id, total: totalReceiptPrice.toString() }));
        yield receiptOrder.save();
        return res.status(200).json(receiptOrder);
    }
    catch (error) {
        console.error("Error creating supplier receipt:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.createReceiptSupplier = createReceiptSupplier;
const getReceiptSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplier = yield ReceiptSupplierModel_1.default.find().populate("supplierId");
        res.status(200).json(supplier);
    }
    catch (error) {
        res.status(500).json("Server error: " + error.message);
    }
});
exports.getReceiptSupplier = getReceiptSupplier;
const deleteReceiptSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receiptId = req.params.id;
    if (!receiptId) {
        return res.status(400).json({
            message: "Lỗi ID phiếu thu",
        });
    }
    try {
        const receipt = yield ReceiptSupplierModel_1.default.findByIdAndDelete(receiptId);
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
exports.deleteReceiptSupplier = deleteReceiptSupplier;
const getInfoReceiptSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const receiptId = req.params.id;
    if (!receiptId) {
        return res.status(400).json({
            message: "ID Receipt not found",
        });
    }
    try {
        const receipt = yield ReceiptSupplierModel_1.default.findById(receiptId)
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
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getInfoReceiptSupplier = getInfoReceiptSupplier;
