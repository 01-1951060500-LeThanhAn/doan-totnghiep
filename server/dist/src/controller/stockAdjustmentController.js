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
exports.getDetailStockAdjustment = exports.getStockAdjustment = exports.updateStockAdjustment = exports.deleteStockAdjustment = exports.createStockAdjustment = void 0;
const StockAdjustmentModel_1 = __importDefault(require("../model/StockAdjustmentModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const createStockAdjustment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { staffId, products, stocktaking_day, generalId } = req.body;
        if (!staffId ||
            !stocktaking_day ||
            !generalId ||
            !products ||
            products.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const productInventories = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const productDoc = yield ProductModel_1.default.findById(product.productId);
            if (!productDoc) {
                throw new Error(`Product not found: ${product.productId}`);
            }
            return Object.assign(Object.assign({}, product), { inventory_saved: productDoc.inventory_number });
        })));
        const stockAdjustment = new StockAdjustmentModel_1.default(Object.assign(Object.assign({}, req.body), { staffId,
            generalId,
            stocktaking_day, products: productInventories }));
        yield stockAdjustment.save();
        return res
            .status(200)
            .json({ message: "Stock adjustment created", stockAdjustment });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});
exports.createStockAdjustment = createStockAdjustment;
const getStockAdjustment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stockAdjustments = yield StockAdjustmentModel_1.default.find();
        return res.status(200).json(stockAdjustments);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getStockAdjustment = getStockAdjustment;
const getDetailStockAdjustment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stockId = req.params.id;
    if (!stockId) {
        return res.status(401).json({ message: "Stock ID not found" });
    }
    try {
        const detailStockAdjustment = yield StockAdjustmentModel_1.default.findById(stockId)
            .populate({
            path: "staffId",
            select: "username email",
        })
            .populate({
            path: "generalId",
            select: "name",
        })
            .populate({
            path: "products",
            populate: {
                path: "productId",
                select: "name_product img code unit type inventory_number",
            },
        });
        if (!detailStockAdjustment) {
            return res.status(404).json({ message: "Stock adjustment not found" });
        }
        return res.status(200).json(detailStockAdjustment);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getDetailStockAdjustment = getDetailStockAdjustment;
const updateStockAdjustment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryId = req.params.id;
    if (!inventoryId) {
        return res.status(400).json({ message: "Inventory ID is required" });
    }
    try {
        const updatedStockAdjustment = yield StockAdjustmentModel_1.default.findByIdAndUpdate(inventoryId, {
            $set: req.body,
        }, {
            new: true,
        });
        if (!updatedStockAdjustment) {
            return res
                .status(404)
                .json({ message: "Không tìm thấy phiếu kiểm hàng" });
        }
        const inventoryStatus = (updatedStockAdjustment === null || updatedStockAdjustment === void 0 ? void 0 : updatedStockAdjustment.inventory_status) === "completed";
        if (inventoryStatus) {
            const productUpdates = updatedStockAdjustment.products.map((productAdjustment) => __awaiter(void 0, void 0, void 0, function* () {
                const { productId, inventory_saved, inventory_discrepancy, inventory_number, inventory_total, } = productAdjustment;
                const product = yield ProductModel_1.default.findByIdAndUpdate(productId, {
                    $inc: {
                        inventory_number: inventory_number - inventory_discrepancy + inventory_total,
                    },
                    $push: {
                        stockAdjustmentHistory: {
                            stockAjustmentId: updatedStockAdjustment._id,
                        },
                    },
                }, { new: true });
                if (!product) {
                    console.error(`Error updating product ${productId}`);
                }
                return product;
            }));
            yield Promise.all(productUpdates);
        }
        res.status(200).json(updatedStockAdjustment);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateStockAdjustment = updateStockAdjustment;
const deleteStockAdjustment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stockId = req.params.id;
    if (!stockId) {
        return res.status(401).json({ message: "Stock ID not found" });
    }
    try {
        const deletedStockAdjustment = yield StockAdjustmentModel_1.default.findByIdAndDelete(stockId);
        if (!deletedStockAdjustment) {
            return res
                .status(404)
                .json({ message: "Không tìm thấy phiếu kiểm hàng" });
        }
        res.status(200).json({
            message: "Phiếu kiểm đã được xóa.",
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteStockAdjustment = deleteStockAdjustment;
