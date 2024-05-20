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
exports.getTypeProducts = exports.getDetailProduct = exports.searchProduct = exports.deleteProduct = exports.updateProduct = exports.getListProducts = exports.createProduct = void 0;
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generalId = req.body.generalId;
        if (!generalId) {
            return res.status(400).json({ message: "ID General is required" });
        }
        const general = yield GeneralDepotModel_1.default.findById(generalId);
        if (!general) {
            return res.status(400).json({ message: "General not found" });
        }
        const product = new ProductModel_1.default(Object.assign(Object.assign({}, req.body), { generalId: general._id }));
        yield product.save();
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createProduct = createProduct;
const getListProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const status = req.query.status;
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = req.user;
        if (!user || !(user === null || user === void 0 ? void 0 : user.role)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let generals = [];
        if (((_a = user === null || user === void 0 ? void 0 : user.role) === null || _a === void 0 ? void 0 : _a.name) === "admin") {
            generals = yield ProductModel_1.default.find({
                manager: user._id,
                status: status ? status : { $exists: true },
            }).populate("type generalId manager");
        }
        else if (((_b = user === null || user === void 0 ? void 0 : user.role) === null || _b === void 0 ? void 0 : _b.name) === "manager") {
            generals = yield ProductModel_1.default.find({
                manager: user._id,
                status: status ? status : { $exists: true },
            }).populate("generalId type manager");
        }
        else {
            generals = [];
        }
        res.status(200).json(generals);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getListProducts = getListProducts;
const getTypeProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const status = req.query.status;
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = req.user;
        if (!user || !(user === null || user === void 0 ? void 0 : user.role)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let generals = [];
        if (((_c = user === null || user === void 0 ? void 0 : user.role) === null || _c === void 0 ? void 0 : _c.name) === "admin") {
            generals = yield ProductModel_1.default.find({
                manager: user._id,
                status: status ? status : { $exists: true },
            }).populate("type generalId manager");
        }
        else if (((_d = user === null || user === void 0 ? void 0 : user.role) === null || _d === void 0 ? void 0 : _d.name) === "manager") {
            generals = yield ProductModel_1.default.find({
                manager: user._id,
                status: status ? status : { $exists: true },
            }).populate("generalId type manager");
        }
        else {
            generals = [];
        }
        res.status(200).json(generals);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getTypeProducts = getTypeProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield ProductModel_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const deleteProductId = yield ProductModel_1.default.findByIdAndDelete(productId);
        if (!deleteProductId) {
            return res.status(401).json({
                message: "Mã sản phẩm không hợp lệ hoặc không tồn tại",
            });
        }
        res.status(200).json({
            message: "Xóa sản phẩm thành công",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi khi xóa sản phẩm",
        });
    }
});
exports.deleteProduct = deleteProduct;
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    if (!keyword.trim()) {
        return res.status(400).json({
            success: false,
            message: "Missing paramaters!",
        });
    }
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = req.user;
        const nameProduct = new RegExp(keyword, "i");
        const results = yield ProductModel_1.default.find({
            name_product: nameProduct,
            manager: user._id,
        });
        if (!results.length) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }
        res.status(200).json(results);
    }
    catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: "Lỗi tìm kiếm sản phẩm" });
    }
});
exports.searchProduct = searchProduct;
const getDetailProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield ProductModel_1.default.findById(productId)
            .populate("type generalId manager")
            .populate({
            path: "transactionHistory.orderId",
        })
            .populate({
            path: "transactionHistory.staffId",
        })
            .populate({
            path: "stockAdjustmentHistory.stockAjustmentId",
        });
        if (!product) {
            return res.status(404).json({
                message: "Sản phẩm không tồn tại",
            });
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi khi hiển thị chi tiết sản phẩm",
        });
    }
});
exports.getDetailProduct = getDetailProduct;
