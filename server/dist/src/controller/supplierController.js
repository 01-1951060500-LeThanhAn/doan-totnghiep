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
exports.getDetailSupplier = exports.deleteSupplier = exports.updateSupplier = exports.getListSuppliers = exports.createSupplier = void 0;
const SupplierModel_1 = __importDefault(require("../model/SupplierModel"));
const WarehouseModel_1 = __importDefault(require("../model/WarehouseModel"));
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const suppliers = new SupplierModel_1.default(Object.assign({}, req.body));
    try {
        yield suppliers.save();
        res.status(200).json(suppliers);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.createSupplier = createSupplier;
const getListSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield SupplierModel_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getListSuppliers = getListSuppliers;
const getDetailSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const supplierId = req.params.id;
    try {
        const supplier = yield WarehouseModel_1.default.find({ supplierId }).populate("productId supplierId");
        if (!supplier) {
            return res.status(404).json({
                message: "Supplier not found",
            });
        }
        res.status(200).json(supplier);
    }
    catch (error) {
        console.error("Error fetching supplier details:", error);
        res.status(500).json({ message: "Error fetching supplier details" });
    }
});
exports.getDetailSupplier = getDetailSupplier;
const updateSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updateSupplier = yield SupplierModel_1.default.findByIdAndUpdate(id, {
            $set: req.body,
        }, {
            new: true,
        });
        yield (updateSupplier === null || updateSupplier === void 0 ? void 0 : updateSupplier.save());
        res.json(updateSupplier);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi khi cập nhật nhà cung cấp",
        });
    }
});
exports.updateSupplier = updateSupplier;
const deleteSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const supplierId = req.params.id;
    try {
        const deleteSupplierId = yield SupplierModel_1.default.findByIdAndDelete(supplierId);
        if (!deleteSupplierId) {
            return res.status(401).json({
                message: "Mã nhà cung cấp không hợp lệ hoặc không tồn tại",
            });
        }
        res.status(200).json({
            message: "Xóa nhà cung cấp thành công",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi khi xóa nhà cung cấp",
        });
    }
});
exports.deleteSupplier = deleteSupplier;
