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
exports.getDetailImportOrder = exports.updateImportOrder = exports.getAllOrderImport = exports.createImportOrder = void 0;
const ImportOrderModel_1 = __importDefault(require("../model/ImportOrderModel"));
const WarehouseModel_1 = __importDefault(require("../model/WarehouseModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const createImportOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { supplierId, productId, inventory_number, import_price, code, received_date, } = req.body;
    try {
        const newImportOrder = new ImportOrderModel_1.default({
            code: code,
            supplierId: supplierId,
            productId: productId,
            inventory_number: inventory_number,
            import_price: import_price,
            total_price: inventory_number * import_price,
            payment_status: "pending",
            order_status: "not-entered",
            received_date: received_date,
        });
        yield newImportOrder.save();
        res.status(200).json(newImportOrder);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.createImportOrder = createImportOrder;
const getAllOrderImport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield ImportOrderModel_1.default.find().populate("productId supplierId");
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllOrderImport = getAllOrderImport;
const updateImportOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        if (!orderId)
            return res.status(404).json("Đơn đặt hàng này không tồn tại");
        const order = yield ImportOrderModel_1.default.findByIdAndUpdate(orderId, {
            order_status: "entered",
        }, { new: true });
        if (!order) {
            throw new Error("Order not found");
        }
        yield ProductModel_1.default.findOneAndUpdate({ _id: order.productId }, { $inc: { inventory_number: order === null || order === void 0 ? void 0 : order.inventory_number } }, { upsert: true, new: true });
        const newWarehouseEntry = new WarehouseModel_1.default({
            inventory_number: order.inventory_number,
            import_price: order.import_price,
            totalPrice: order.import_price * order.inventory_number,
            productId: order.productId,
            supplierId: order.supplierId,
            payment_status: order.payment_status,
        });
        yield newWarehouseEntry.save();
        res.status(200).json({
            message: "Order updated successfully",
            newWarehouseEntry,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server not found",
        });
    }
});
exports.updateImportOrder = updateImportOrder;
const getDetailImportOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderImportId = req.params.id;
    if (!orderImportId) {
        return res.status(404).json("Đơn đặt hàng này không tồn tại");
    }
    try {
        const data = yield ImportOrderModel_1.default.findById(orderImportId).populate("productId supplierId");
        if (!data) {
            return res.status(404).json({
                message: "Đơn đặt hàng này không tồn tại",
            });
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.getDetailImportOrder = getDetailImportOrder;
