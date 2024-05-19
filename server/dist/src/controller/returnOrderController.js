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
exports.updateReturnOrders = exports.deleteReturnOrder = exports.getDetailReturnOrder = exports.getReturnOrder = exports.createReturnOrder = void 0;
const OrderModel_1 = __importDefault(require("../model/OrderModel"));
const ReturnOrderModel_1 = __importDefault(require("../model/ReturnOrderModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const createReturnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, products } = req.body;
        if (!orderId || !products) {
            return res.status(400).json({ message: "Missing required details" });
        }
        const order = yield OrderModel_1.default.findById(orderId);
        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }
        const returnOrders = new ReturnOrderModel_1.default(Object.assign(Object.assign({}, req.body), { orderId, customerId: order.customerId, generalId: order.generalId, return_reason: req.body.return_reason, products }));
        for (const product of products) {
            const productId = product.productId;
            const quantityToReturn = product.quantity;
            const data = yield ProductModel_1.default.findById(product.productId);
            if (!data) {
                return res
                    .status(400)
                    .json({ message: `Product not found: ${product.productId}` });
            }
            yield ProductModel_1.default.findByIdAndUpdate(productId, {
                $inc: { inventory_number: quantityToReturn },
            });
            yield order.save();
        }
        yield returnOrders.save();
        res.status(200).json(returnOrders);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.createReturnOrder = createReturnOrder;
const getReturnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnOrders = yield ReturnOrderModel_1.default.find();
        return res.status(200).json(returnOrders);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getReturnOrder = getReturnOrder;
const getDetailReturnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnOrderId = req.params.id;
    if (!returnOrderId) {
        return res.status(400).json({ message: "Id Return Order not found" });
    }
    try {
        const returnOrder = yield ReturnOrderModel_1.default.findById(returnOrderId).populate("customerId generalId orderId products.productId");
        if (!returnOrder) {
            return res.status(404).json({ message: "Return Order not found" });
        }
        res.status(200).json(returnOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching return order details" });
    }
});
exports.getDetailReturnOrder = getDetailReturnOrder;
const deleteReturnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnOrderId = req.params.id;
    if (!returnOrderId) {
        return res.status(400).json({ message: "Id Return Order not found" });
    }
    try {
        const returnOrder = yield ReturnOrderModel_1.default.findByIdAndDelete(returnOrderId);
        if (!returnOrder) {
            return res.status(400).json({ message: "Return Order not found" });
        }
        return res
            .status(200)
            .json({ message: "Return Order deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.deleteReturnOrder = deleteReturnOrder;
const updateReturnOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const returnOrderId = req.params.id;
    if (!returnOrderId) {
        return res.status(400).json({ message: "Id Return Order not found" });
    }
    try {
        const originalReturnOrderData = yield ReturnOrderModel_1.default.findById(returnOrderId).populate("products.productId");
        const updatedReturnOrderData = yield ReturnOrderModel_1.default.findByIdAndUpdate(returnOrderId, {
            refund_status: "refunded",
        }, {
            new: true,
        });
        if (!updatedReturnOrderData) {
            return res.status(404).json({ message: "Không tìm thấy đơn trả hàng" });
        }
        const paymentStatusChangedToPaid = (originalReturnOrderData === null || originalReturnOrderData === void 0 ? void 0 : originalReturnOrderData.refund_status) !== "refunded" &&
            (updatedReturnOrderData === null || updatedReturnOrderData === void 0 ? void 0 : updatedReturnOrderData.refund_status) === "refunded";
        if (paymentStatusChangedToPaid) {
            const customerId = updatedReturnOrderData.customerId;
            const totalPrice = updatedReturnOrderData.totalPrice;
            const customer = yield CustomerModel_1.default.findById(customerId);
            const currentBalanceIncreases = (customer === null || customer === void 0 ? void 0 : customer.balance_increases) || 0;
            const currentBalanceDecreases = (customer === null || customer === void 0 ? void 0 : customer.balance_decreases) || 0;
            const remainingDecreases = Number(currentBalanceIncreases) - Number(currentBalanceDecreases);
            const updatedBalanceDecreases = Number(currentBalanceDecreases) + totalPrice;
            const updatedRemainingDecreases = Math.max(remainingDecreases - totalPrice, 0);
            yield CustomerModel_1.default.findByIdAndUpdate(customerId, {
                balance_increases: currentBalanceIncreases - totalPrice,
                balance_decreases: currentBalanceIncreases - totalPrice,
                remaining_decreases: updatedRemainingDecreases,
                ending_balance: updatedRemainingDecreases,
            });
        }
        if (paymentStatusChangedToPaid) {
            yield OrderModel_1.default.findByIdAndUpdate(updatedReturnOrderData === null || updatedReturnOrderData === void 0 ? void 0 : updatedReturnOrderData._id, {
                $inc: { totalPrice: -(updatedReturnOrderData === null || updatedReturnOrderData === void 0 ? void 0 : updatedReturnOrderData.totalPrice) },
            });
        }
        res.status(200).json(updatedReturnOrderData);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateReturnOrders = updateReturnOrders;
