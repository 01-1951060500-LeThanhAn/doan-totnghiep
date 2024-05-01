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
exports.deleteImportOrder = exports.getDetailImportOrder = exports.updateImportOrder = exports.getAllOrderImport = exports.createImportOrder = void 0;
const ImportOrderModel_1 = __importDefault(require("../model/ImportOrderModel"));
const WarehouseModel_1 = __importDefault(require("../model/WarehouseModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const createImportOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierId, products } = req.body;
        if (!supplierId || !products || products.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const totalQuantity = products.reduce((acc, product) => acc + Number(product.inventory_number), 0);
        const totalPrice = products.reduce((acc, product) => acc + product.inventory_number * product.import_price, 0);
        const newImportOrder = new ImportOrderModel_1.default(Object.assign(Object.assign({}, req.body), { totalQuantity, totalPrice: totalPrice }));
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
        const orders = yield ImportOrderModel_1.default.find().populate("products.productId supplierId generalId");
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
        const totalQuantity = order.products.reduce((acc, product) => acc + Number(product.inventory_number), 0);
        const newWarehouseEntry = new WarehouseModel_1.default({
            code: order.code,
            import_price: order.products[0].import_price,
            totalPrice,
            totalQuantity,
            products: order.products,
            delivery_date: order.received_date,
            supplierId: order.supplierId,
            generalId: order.generalId,
            order_status: order.order_status,
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
        const data = yield ImportOrderModel_1.default.findById(orderImportId)
            .populate("products.productId")
            .populate({
            path: "generalId",
            select: "-createdAt -updatedAt -manager -products -type",
        })
            .populate({
            path: "supplierId",
            select: "-createdAt -updatedAt -desc -userId -tax_code -website",
        });
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
const deleteImportOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderImportId = req.params.id;
    if (!orderImportId) {
        return res.status(404).json("Đơn đặt hàng này không tồn tại");
    }
    try {
        const order = yield ImportOrderModel_1.default.findByIdAndDelete(orderImportId);
        if (!order) {
            return res.status(404).json("Đơn đặt hàng này không tồn tại");
        }
        res.status(200).json("Đã xóa đơn đặt hàng thành công");
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.deleteImportOrder = deleteImportOrder;
