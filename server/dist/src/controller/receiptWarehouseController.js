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
const createReceiptSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierId, totalPrice, warehouseId } = req.body;
        if (!supplierId || !warehouseId) {
            return res.status(400).json("Missing supplierId or warehouseId");
        }
        const supplier = yield SupplierModel_1.default.findById(supplierId);
        if (!supplier) {
            return res.status(400).json("Supplier not found");
        }
        const currentBalanceIncreases = (supplier === null || supplier === void 0 ? void 0 : supplier.balance_increases) || 0;
        const currentBalanceDecreases = (supplier === null || supplier === void 0 ? void 0 : supplier.balance_decreases) || 0;
        const remainingDecreases = currentBalanceIncreases - currentBalanceDecreases;
        const updatedBalanceDecreases = currentBalanceDecreases + totalPrice;
        const updatedRemainingDecreases = Math.max(remainingDecreases - totalPrice, 0);
        yield SupplierModel_1.default.findByIdAndUpdate(warehouseId, {
            balance_decreases: updatedBalanceDecreases,
            remaining_decreases: updatedRemainingDecreases,
            ending_balance: updatedRemainingDecreases,
        });
        yield WarehouseModel_1.default.findByIdAndUpdate(warehouseId, {
            $inc: { totalPrice: -totalPrice },
        });
        const receiptOrder = new ReceiptSupplierModel_1.default(Object.assign(Object.assign({}, req.body), { supplierId: supplier._id, totalPrice }));
        yield receiptOrder.save();
        return res.status(200).json(receiptOrder);
    }
    catch (error) {
        res.status(500).json("Server error: " + error.message);
    }
});
exports.createReceiptSupplier = createReceiptSupplier;
const getReceiptSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supplier = yield ReceiptSupplierModel_1.default.find();
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
            path: "warehouseId",
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
