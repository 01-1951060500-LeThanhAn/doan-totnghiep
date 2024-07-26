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
exports.getIncomeReturnOrderByProduct = exports.updateReturnOrders = exports.deleteReturnOrder = exports.getDetailReturnOrder = exports.getReturnOrder = exports.createReturnOrder = void 0;
const OrderModel_1 = __importDefault(require("../model/OrderModel"));
const ReturnOrderModel_1 = __importDefault(require("../model/ReturnOrderModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const createReturnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, products } = req.body;
        if (!orderId || !products) {
            return res.status(400).json({ message: "Missing required details" });
        }
        for (let product of products) {
            const productId = product.productId;
            const data = yield ProductModel_1.default.findById(product.productId);
            if (!data) {
                return res
                    .status(400)
                    .json({ message: `Product not found: ${product.productId}` });
            }
            yield ProductModel_1.default.findByIdAndUpdate(productId, {
                $inc: { inventory_number: product.quantity },
            });
            yield OrderModel_1.default.findByIdAndUpdate(orderId, {
                $inc: { totalReturnOrders: product.quantity },
            });
        }
        const returnOrders = new ReturnOrderModel_1.default(Object.assign(Object.assign({}, req.body), { orderId, return_reason: req.body.return_reason, products }));
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
        const updatedReturnOrderData = yield ReturnOrderModel_1.default.findByIdAndUpdate(returnOrderId, { refund_status: "refunded" }, { new: true });
        if (!updatedReturnOrderData) {
            return res.status(404).json({ message: "Không tìm thấy đơn trả hàng" });
        }
        const statusOrder = (updatedReturnOrderData === null || updatedReturnOrderData === void 0 ? void 0 : updatedReturnOrderData.refund_status) !== "refunded";
        const order = yield OrderModel_1.default.findById(updatedReturnOrderData.orderId);
        const customer = yield CustomerModel_1.default.findById(updatedReturnOrderData.customerId);
        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }
        if (!customer) {
            return res.status(400).json({ message: "Customer not found" });
        }
        for (const returnProduct of updatedReturnOrderData.products) {
            const orderProductIndex = order.products.findIndex((p) => p.productId === returnProduct.productId);
            order.products[orderProductIndex].quantity -= returnProduct.quantity;
            order.products[orderProductIndex].totalReturnOrders +=
                returnProduct.quantity;
        }
        order.totalReturnOrders = order.products.reduce((sum, product) => sum + product.totalReturnOrders, 0);
        order.totalQuantity = order.products.reduce((sum, product) => sum + product.quantity, 0);
        if (statusOrder) {
            const currentBalance = new decimal_js_1.default(customer.balance_increases).add(new decimal_js_1.default(customer.opening_balance));
            const refundAmount = new decimal_js_1.default((updatedReturnOrderData === null || updatedReturnOrderData === void 0 ? void 0 : updatedReturnOrderData.totalPrice) || 0);
            yield CustomerModel_1.default.findByIdAndUpdate(updatedReturnOrderData.customerId, {
                balance_increases: currentBalance.sub(refundAmount).toString(),
                balance_decreases: currentBalance.sub(refundAmount).toString(),
            });
        }
        yield order.save();
        res.status(200).json(updatedReturnOrderData);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.updateReturnOrders = updateReturnOrders;
const getIncomeReturnOrderByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = yield ReturnOrderModel_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "products",
                },
            },
            {
                $unwind: "$products",
            },
            {
                $project: {
                    _id: "$products._id",
                    productName: "$products.name_product",
                    productCode: "$products.code",
                    img: "$products.img",
                    price: "$products.export_price",
                    totalOrders: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    name_product: { $first: "$productName" },
                    code: { $first: "$productCode" },
                    price: { $first: "$price" },
                    img: { $first: "$img" },
                    totalOrders: { $sum: "$totalOrders" },
                },
            },
        ]);
        return res.status(200).json(incomeData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getIncomeReturnOrderByProduct = getIncomeReturnOrderByProduct;
