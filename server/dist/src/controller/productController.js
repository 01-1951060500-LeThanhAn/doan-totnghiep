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
exports.getDetailProduct = exports.searchProduct = exports.deleteProduct = exports.updateProduct = exports.getListProducts = exports.createProduct = void 0;
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = new ProductModel_1.default(Object.assign({}, req.body));
    try {
        yield products.save();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createProduct = createProduct;
const getListProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel_1.default.find().populate("type");
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getListProducts = getListProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(products);
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
    const query = req.query.keyword;
    const name = req.query.name;
    try {
        const products = yield ProductModel_1.default.find({
            $or: [
                { material_name: { $regex: query, $options: "i" } }, // Case-insensitive search for material_name
                { material_code: { $regex: name, $options: "i" } }, // Case-insensitive search for material_code
            ],
        });
        if (!products.length) {
            return res.status(401).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error searching products:", error);
        throw error; // Re-throw the error for proper handling
    }
});
exports.searchProduct = searchProduct;
const getDetailProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield ProductModel_1.default.findById(productId);
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
