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
exports.getIncomeOrdersProduct = exports.getIncomeOrdersCustomer = exports.getIncomeOrdersGeneral = exports.searchOrder = exports.getIncomeOrders = exports.getDetailOrder = exports.deleteOrder = exports.updateOrder = exports.getAllOrder = exports.createOrder = void 0;
const OrderModel_1 = __importDefault(require("../model/OrderModel"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
const TransactionModel_1 = __importDefault(require("../model/TransactionModel"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.body.customerId;
        const userId = req.body.userId;
        if (!customerId) {
            return res.status(400).json({ message: "customerId is required" });
        }
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const customer = yield CustomerModel_1.default.findById(customerId);
        if (!customer) {
            return res.status(400).json({ message: "customerId not found" });
        }
        const newOrder = new OrderModel_1.default(Object.assign(Object.assign({}, req.body), { customerId: customer._id, userId, payment_status: "unpaid" }));
        const savedOrder = yield newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.createOrder = createOrder;
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = req.user;
        if (!user || !(user === null || user === void 0 ? void 0 : user.role)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let orders = [];
        if (((_a = user === null || user === void 0 ? void 0 : user.role) === null || _a === void 0 ? void 0 : _a.name) === "admin") {
            orders = yield OrderModel_1.default.find().populate("userId");
        }
        else if (((_b = user === null || user === void 0 ? void 0 : user.role) === null || _b === void 0 ? void 0 : _b.name) === "manager") {
            orders = yield OrderModel_1.default.find({ userId: user._id }).populate("userId");
        }
        else {
            orders = [];
        }
        res.status(200).json(orders);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching orders", error: err });
    }
});
exports.getAllOrder = getAllOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    if (!cartId) {
        return res.status(400).json({
            message: "Lỗi khi cập nhật giỏ hàng",
        });
    }
    try {
        const originalOrder = yield OrderModel_1.default.findById(cartId);
        const updatedOrder = yield OrderModel_1.default.findByIdAndUpdate(cartId, req.body, {
            new: true,
        });
        const paymentStatusChangedToPaid = (originalOrder === null || originalOrder === void 0 ? void 0 : originalOrder.payment_status) !== "paid" &&
            (updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.payment_status) === "paid";
        if (paymentStatusChangedToPaid) {
            let insufficientStock = false;
            for (const product of updatedOrder.products) {
                const foundProduct = yield ProductModel_1.default.findById(product.productId);
                if (foundProduct && foundProduct.inventory_number >= product.quantity) {
                    foundProduct.inventory_number -= product.quantity;
                    yield foundProduct.save();
                }
                else {
                    insufficientStock = true;
                    console.error("Lỗi: Sản phẩm", product.productId, "không đủ hàng trong kho");
                }
            }
            if (insufficientStock) {
                return res
                    .status(400)
                    .json({ message: "Lỗi: Không đủ số lượng sản phẩm trong kho" });
            }
            const transactionHistory = new TransactionModel_1.default({
                transaction_type: "order",
                transaction_date: Date.now(),
                orderId: updatedOrder._id,
            });
            yield transactionHistory.save();
        }
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.id;
    if (!cartId) {
        return res.status(400).json({
            message: "Lỗi khi xóa giỏ hàng",
        });
    }
    try {
        const order = yield OrderModel_1.default.findByIdAndDelete(cartId);
        const customers = yield CustomerModel_1.default.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "customerId",
                    as: "orders",
                },
            },
            {
                $match: {
                    "orders._id": { $in: [cartId] },
                },
            },
        ]);
        res.status(200).json({
            message: "Sản phẩm đã được xóa khỏi giỏ hàng.",
            customers,
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteOrder = deleteOrder;
const getDetailOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).json({ message: "orderId is required" });
        }
        const order = yield OrderModel_1.default.findById(orderId)
            .populate("customerId products.productId partnerId")
            .select("");
        if (!order) {
            return res.status(400).json({ message: "orderId not found" });
        }
        res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.getDetailOrder = getDetailOrder;
const getIncomeOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = yield OrderModel_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    payment_status: "paid",
                },
            },
            {
                $project: {
                    _id: {
                        $dateToString: { format: "%d/%m", date: "$createdAt" },
                    },
                    month: {
                        $month: "$createdAt",
                    },
                    total_price: {
                        $cond: [{ $eq: ["$payment_status", "paid"] }, "$total_price", 0],
                    },
                    total_orders: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    month: { $first: "$month" },
                    total_income: { $sum: "$total_price" },
                    total_orders: { $sum: "$total_orders" },
                },
            },
        ]);
        const statusData = yield OrderModel_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $group: {
                    _id: "$order_status",
                    count: { $sum: 1 },
                },
            },
        ]);
        const response = {
            incomeData,
            statusData: statusData.map((item) => ({
                status: item._id,
                count: item.count,
            })),
        };
        res.status(200).json(response);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching income and status data" });
    }
});
exports.getIncomeOrders = getIncomeOrders;
const getIncomeOrdersGeneral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const pipeline = [
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "generalId",
                    as: "orders",
                },
            },
            {
                $unwind: "$orders",
            },
            {
                $project: {
                    _id: {
                        general: "$orders.generalId",
                        month: { $month: "$createdAt" },
                    },
                    count: {
                        $first: "$orders.products.quantity",
                    },
                    total_price: {
                        $cond: [
                            { $eq: ["$orders.payment_status", "paid"] },
                            "$orders.total_price",
                            0,
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.general",
                    month: { $first: "$_id.month" },
                    total_products: { $sum: "$count" },
                    total_price: { $sum: "$total_price" },
                },
            },
        ];
        const results = yield GeneralDepotModel_1.default.aggregate(pipeline);
        const enrichedResults = [];
        for (const result of results) {
            const warehouseId = result._id;
            const warehouse = yield GeneralDepotModel_1.default.findById(warehouseId);
            if (warehouse) {
                const enrichedResult = Object.assign(Object.assign({}, result), { name: warehouse.name, type: warehouse.type });
                enrichedResults.push(enrichedResult);
            }
        }
        res.status(200).json(enrichedResults);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching income data" });
    }
});
exports.getIncomeOrdersGeneral = getIncomeOrdersGeneral;
const getIncomeOrdersCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const pineline = [
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "customerId",
                    as: "orders",
                },
            },
            {
                $unwind: "$orders",
            },
            {
                $lookup: {
                    from: "products",
                    localField: "orders.products.productId",
                    foreignField: "_id",
                    as: "products",
                },
            },
            {
                $unwind: "$products",
            },
            {
                $project: {
                    _id: {
                        month: { $month: "$createdAt" },
                        customer: "$orders.customerId",
                    },
                    quantity: {
                        $first: "$orders.products.quantity",
                    },
                    total_price: "$orders.total_price",
                },
            },
            {
                $group: {
                    _id: "$_id.customer",
                    total_quantity: { $sum: "$quantity" },
                    total_price: { $sum: "$total_price" },
                },
            },
        ];
        const results = yield CustomerModel_1.default.aggregate(pineline);
        const enrichedResults = [];
        for (const result of results) {
            const customerId = result._id;
            const customer = yield CustomerModel_1.default.findById(customerId);
            if (customer) {
                const enrichedResult = Object.assign(Object.assign({}, result), { name: customer.username });
                enrichedResults.push(enrichedResult);
            }
        }
        res.status(200).json(enrichedResults);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching income data by customer" });
    }
});
exports.getIncomeOrdersCustomer = getIncomeOrdersCustomer;
const getIncomeOrdersProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const pineline = [
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "customerId",
                    as: "orders",
                },
            },
            {
                $unwind: "$orders",
            },
            {
                $lookup: {
                    from: "products",
                    localField: "orders.products.productId",
                    foreignField: "_id",
                    as: "products",
                },
            },
            {
                $unwind: "$products",
            },
            {
                $project: {
                    _id: {
                        month: { $month: "$createdAt" },
                        customer: "$orders.customerId",
                    },
                    quantity: {
                        $first: "$orders.products.quantity",
                    },
                    total_price: "$orders.total_price",
                    productName: "$products.name_product",
                    productCode: "$products.code",
                },
            },
            {
                $group: {
                    _id: "$_id.customer",
                    total_quantity: { $sum: "$quantity" },
                    total_price: { $sum: "$total_price" },
                    product_name: { $first: "$productName" },
                    product_code: { $first: "$productCode" },
                },
            },
        ];
        const results = yield CustomerModel_1.default.aggregate(pineline);
        const enrichedResults = [];
        for (const result of results) {
            const customerId = result._id;
            const customer = yield CustomerModel_1.default.findById(customerId);
            if (customer) {
                const enrichedResult = Object.assign(Object.assign({}, result), { name: customer.username, code: customer.code });
                enrichedResults.push(enrichedResult);
            }
        }
        res.status(200).json(enrichedResults);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching income data by customer" });
    }
});
exports.getIncomeOrdersProduct = getIncomeOrdersProduct;
const searchOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    try {
        const titleReg = new RegExp(keyword, "i");
        const results = yield OrderModel_1.default.find({
            order_status: titleReg,
        });
        return res.status(200).json(results);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server not found!",
        });
    }
});
exports.searchOrder = searchOrder;
