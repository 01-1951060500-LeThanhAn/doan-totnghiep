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
    try {
        const newImportOrder = new ImportOrderModel_1.default(Object.assign({}, req.body));
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
        const orders = yield ImportOrderModel_1.default.find().populate("products.productId supplierId");
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
        const productUpdates = order.products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const { productId, inventory_number, import_price } = product;
            if (!productId || !inventory_number || !import_price) {
                return res.status(400).json({ message: "Missing product details" });
            }
            yield ProductModel_1.default.findOneAndUpdate({ _id: productId }, { $inc: { inventory_number } }, { upsert: true, new: true });
        }));
        yield Promise.all(productUpdates);
        const totalPrice = order.products[0].import_price * order.products[0].inventory_number;
        const newWarehouseEntry = new WarehouseModel_1.default({
            inventory_number: order.products[0].inventory_number,
            import_price: order.products[0].import_price,
            totalPrice,
            productId: order.products[0].productId,
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
        console.error("Error creating warehouse entry:", error);
        res.status(500).json({
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
        const data = yield ImportOrderModel_1.default.findById(orderImportId).populate("products.productId supplierId");
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
