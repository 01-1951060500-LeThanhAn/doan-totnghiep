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
exports.updateCategoryProduct = exports.getDetailCategoryProduct = exports.deleteCategoryProduct = exports.getCategoryProduct = exports.createCategoryProduct = void 0;
const CategoryModel_1 = __importDefault(require("../model/CategoryModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createCategoryProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = new CategoryModel_1.default(Object.assign({}, req.body));
        yield category.save();
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createCategoryProduct = createCategoryProduct;
const getCategoryProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield CategoryModel_1.default.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "type",
                    as: "products",
                },
            },
            {
                $group: {
                    _id: "$_id",
                    type: { $first: "$$ROOT" },
                    total_products: { $sum: { $size: "$products" } },
                },
            },
            {
                $project: {
                    _id: 0,
                    type: "$type",
                    total_products: 1,
                },
            },
        ]);
        return res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getCategoryProduct = getCategoryProduct;
const getDetailCategoryProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        if (!categoryId) {
            return res.status(401).json({
                message: "Mã danh mục sản phẩm không hợp lệ hoặc không tồn tại",
            });
        }
        const category = yield CategoryModel_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(categoryId),
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "type",
                    as: "products",
                },
            },
            {
                $project: {
                    _id: 1,
                    type: 1,
                    products: {
                        _id: 1,
                        name_product: 1,
                        code: 1,
                        generalId: 1,
                        unit: 1,
                        import_price: 1,
                        export_price: 1,
                        inventory_number: 1,
                        status: 1,
                        img: 1,
                        desc: 1,
                    },
                },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$_id",
                    totalProducts: {
                        $sum: 1,
                    },
                    products: {
                        $push: "$products",
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    totalProducts: 1,
                    products: 1,
                },
            },
        ]);
        return res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getDetailCategoryProduct = getDetailCategoryProduct;
const updateCategoryProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.id;
    if (!categoryId) {
        return res.status(400).json({
            message: "Mã danh mục sản phẩm không hợp lệ hoặc không tồn tại",
        });
    }
    try {
        const categoryUpdated = yield CategoryModel_1.default.findByIdAndUpdate(categoryId, {
            $set: req.body,
        }, {
            new: true,
        });
        res.status(200).json(categoryUpdated);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi khi xóa danh mục sản phẩm",
        });
    }
});
exports.updateCategoryProduct = updateCategoryProduct;
const deleteCategoryProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryParams = req.params.id;
    try {
        const categoryId = yield CategoryModel_1.default.findByIdAndDelete(categoryParams);
        if (!categoryId) {
            return res.status(401).json({
                message: "Mã danh mục sản phẩm không hợp lệ hoặc không tồn tại",
            });
        }
        res.status(200).json({
            message: "Xóa danh mục sản phẩm thành công",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi khi xóa danh mục sản phẩm",
        });
    }
});
exports.deleteCategoryProduct = deleteCategoryProduct;
