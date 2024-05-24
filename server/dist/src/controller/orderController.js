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
exports.getIncomeOrdersCustomerGroup = exports.getIncomeOrdersArea = exports.getIncomeOrdersProduct = exports.getIncomeOrdersCustomer = exports.getIncomeOrdersGeneral = exports.searchDateOrders = exports.searchOrder = exports.getRevenueOrdersStaff = exports.getRevenueOrdersMonth = exports.getIncomeOrders = exports.getDetailOrder = exports.deleteOrder = exports.updateOrder = exports.getAllOrder = exports.createOrder = void 0;
const OrderModel_1 = __importDefault(require("../model/OrderModel"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
const TransactionModel_1 = __importDefault(require("../model/TransactionModel"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId, userId, products } = req.body;
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }
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
        const totalQuantity = products.reduce((acc, product) => acc + Number(product.quantity), 0);
        for (const product of products) {
            yield ProductModel_1.default.findByIdAndUpdate(product.productId, {
                $inc: { pendingOrderQuantity: product.quantity },
            });
        }
        let totalPrice = 0;
        for (const product of products) {
            const productData = yield ProductModel_1.default.findById(product.productId);
            if (!productData) {
                return res
                    .status(400)
                    .json({ message: `Product not found: ${product.productId}` });
            }
            totalPrice = products.reduce((acc, product) => acc + Number(product.quantity) * Number(productData.export_price), 0);
        }
        const newOrder = new OrderModel_1.default(Object.assign(Object.assign({}, req.body), { customerId: customer._id, userId,
            totalQuantity, payment_status: "unpaid" }));
        const currentBalance = customer.balance_increases + customer.opening_balance;
        yield CustomerModel_1.default.findByIdAndUpdate(customerId, {
            balance_increases: currentBalance + totalPrice,
            ending_balance: currentBalance + totalPrice,
        });
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
            orders = yield OrderModel_1.default.find().populate("userId products.productId");
        }
        else if (((_b = user === null || user === void 0 ? void 0 : user.role) === null || _b === void 0 ? void 0 : _b.name) === "manager") {
            orders = yield OrderModel_1.default.find({ userId: user._id }).populate("userId products.productId");
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
        if (!updatedOrder) {
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
        }
        const paymentStatusChangedToPaid = (originalOrder === null || originalOrder === void 0 ? void 0 : originalOrder.payment_status) !== "paid" &&
            (updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.payment_status) === "paid";
        if (paymentStatusChangedToPaid) {
            const customerId = updatedOrder.customerId;
            const totalPrice = updatedOrder.totalPrice;
            const customer = yield CustomerModel_1.default.findById(customerId);
            const currentBalanceIncreases = (customer === null || customer === void 0 ? void 0 : customer.balance_increases) || 0;
            const currentBalanceDecreases = (customer === null || customer === void 0 ? void 0 : customer.balance_decreases) || 0;
            const remainingDecreases = Number(currentBalanceIncreases) - Number(currentBalanceDecreases);
            const updatedBalanceDecreases = Number(currentBalanceDecreases) + Number(totalPrice);
            const updatedRemainingDecreases = Math.max(remainingDecreases - totalPrice, 0);
            yield CustomerModel_1.default.findByIdAndUpdate(customerId, {
                balance_decreases: updatedBalanceDecreases,
                remaining_decreases: updatedRemainingDecreases,
                ending_balance: updatedRemainingDecreases,
            });
            for (const product of updatedOrder.products) {
                yield ProductModel_1.default.findByIdAndUpdate(product.productId, {
                    $inc: { pendingOrderQuantity: -product.quantity },
                });
            }
            const updatePromises = updatedOrder.products.map((productItem) => __awaiter(void 0, void 0, void 0, function* () {
                const product = yield ProductModel_1.default.findById(productItem.productId);
                if (product) {
                    if (product.inventory_number >= productItem.quantity) {
                        product.inventory_number -= productItem.quantity;
                        yield product.updateOne({
                            $inc: { inventory_number: -productItem.quantity },
                            $push: {
                                transactionHistory: {
                                    orderId: updatedOrder._id,
                                    quantity: productItem.quantity,
                                    generalId: updatedOrder.generalId,
                                    staffId: updatedOrder.userId,
                                    inventory_number: product.inventory_number,
                                },
                            },
                        });
                    }
                    else {
                        throw new Error(`Insufficient stock for product ${product.name_product}`);
                    }
                }
                else {
                    throw new Error(`Product not found: ${productItem.productId}`);
                }
            }));
            yield Promise.all(updatePromises);
        }
        if (paymentStatusChangedToPaid) {
            yield OrderModel_1.default.findByIdAndUpdate(updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder._id, {
                $inc: { totalPrice: -(updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.totalPrice) },
            });
        }
        const transactionHistory = new TransactionModel_1.default({
            transaction_type: "order",
            transaction_date: Date.now(),
            orderId: updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder._id,
        });
        yield transactionHistory.save();
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
        const deletedOrder = yield OrderModel_1.default.findByIdAndDelete(cartId);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Đơn hàng không tồn tại" });
        }
        const customerId = deletedOrder.customerId;
        const orderTotalPrice = deletedOrder.totalPrice; // Get the order's total price
        const customer = yield CustomerModel_1.default.findById(customerId);
        if (!customer) {
            throw new Error(`Customer not found: ${customerId}`);
        }
        const updatedBalanceIncreases = Math.max(customer.balance_increases - orderTotalPrice, 0);
        const updatedRemainingDecreases = customer.opening_balance +
            updatedBalanceIncreases -
            customer.balance_decreases;
        const updatedEndingBalance = updatedRemainingDecreases;
        yield CustomerModel_1.default.findByIdAndUpdate(customerId, {
            balance_increases: updatedBalanceIncreases,
            remaining_decreases: updatedRemainingDecreases,
            ending_balance: updatedEndingBalance,
        });
        if (deletedOrder.payment_status === "unpaid") {
            for (const product of deletedOrder.products) {
                yield ProductModel_1.default.findByIdAndUpdate(product.productId, {
                    $inc: { pendingOrderQuantity: -product.quantity },
                });
            }
        }
        res.status(200).json({
            message: "Sản phẩm đã được xóa khỏi giỏ hàng.",
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
            .populate({
            path: "customerId",
            select: "username code address phone city district ward specific_address",
        })
            .populate({
            path: "partnerId",
            select: "username code address phone ",
        })
            .populate({
            path: "userId",
            select: "username ",
        })
            .populate({
            path: "generalId",
            select: "name ",
        })
            .populate({
            path: "products.productId",
            select: "",
        })
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
                    totalPrice: {
                        $cond: [
                            { $eq: ["$payment_status", "paid"] },
                            "$totalCustomerPay",
                            0,
                        ],
                    },
                    total_orders: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    month: { $first: "$month" },
                    total_income: { $sum: "$totalPrice" },
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
const getRevenueOrdersMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
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
                        $dateToString: { format: "%m/%Y", date: "$createdAt" },
                    },
                    month: {
                        $month: "$createdAt",
                    },
                    totalPrice: {
                        $cond: [
                            { $eq: ["$payment_status", "paid"] },
                            "$totalCustomerPay",
                            0,
                        ],
                    },
                    total_orders: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    month: { $first: "$month" },
                    total_income: { $sum: "$totalPrice" },
                    total_orders: { $sum: "$total_orders" },
                },
            },
            {
                $sort: { month: 1 },
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
exports.getRevenueOrdersMonth = getRevenueOrdersMonth;
const getRevenueOrdersStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const pipeline = [
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    payment_status: "paid",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "users",
                },
            },
            {
                $unwind: "$users",
            },
            {
                $project: {
                    _id: {
                        _id: "$users._id",
                        username: "$users.username",
                        email: "$users.email",
                        month: { $month: "$createdAt" },
                    },
                    total_quantity: {
                        $sum: 1,
                    },
                    total_price: {
                        $sum: "$totalCustomerPay",
                    },
                },
            },
            {
                $group: {
                    _id: "$_id._id",
                    email: { $first: "$_id.email" },
                    username: { $first: "$_id.username" },
                    total_quantity: { $sum: "$total_quantity" },
                    total_price: { $sum: "$total_price" },
                },
            },
        ];
        const results = yield OrderModel_1.default.aggregate(pipeline);
        res.status(200).json(results);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching warehouse statistics" });
    }
});
exports.getRevenueOrdersStaff = getRevenueOrdersStaff;
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
                    totalPrice: {
                        $cond: [
                            { $eq: ["$orders.payment_status", "paid"] },
                            "$orders.totalPrice",
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
                    totalPrice: { $sum: "$totalPrice" },
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
                    totalPrice: "$orders.totalPrice",
                },
            },
            {
                $group: {
                    _id: "$_id.customer",
                    total_quantity: { $sum: "$quantity" },
                    totalPrice: { $sum: "$totalPrice" },
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
                    totalPrice: "$orders.totalCustomerPay",
                    productName: "$products.name_product",
                    productId: "$products._id",
                    productCode: "$products.code",
                },
            },
            {
                $group: {
                    _id: "$_id.customer",
                    productId: { $first: "$productId" },
                    total_quantity: { $sum: "$quantity" },
                    totalPrice: { $sum: "$totalPrice" },
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
const getIncomeOrdersArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const results = yield CustomerModel_1.default.aggregate([
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
                $project: {
                    _id: {
                        month: { $month: "$createdAt" },
                        city: "$city",
                    },
                    totalPrice: "$orders.totalCustomerPay",
                },
            },
            {
                $group: {
                    _id: "$_id.city",
                    totalCustomers: { $sum: 1 },
                    totalOrders: { $sum: 1 },
                    totalPrice: { $sum: "$totalPrice" },
                },
            },
        ]);
        res.status(200).json(results);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching income data by location" });
    }
});
exports.getIncomeOrdersArea = getIncomeOrdersArea;
const getIncomeOrdersCustomerGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const results = yield CustomerModel_1.default.aggregate([
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
                $project: {
                    _id: {
                        month: { $month: "$createdAt" },
                        type: "$type",
                    },
                    totalPrice: "$orders.totalCustomerPay",
                },
            },
            {
                $group: {
                    _id: "$_id.type",
                    totalCustomers: { $sum: 1 },
                    totalOrders: { $sum: 1 },
                    totalPrice: { $sum: "$totalPrice" },
                },
            },
        ]);
        res.status(200).json(results);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching income data by location" });
    }
});
exports.getIncomeOrdersCustomerGroup = getIncomeOrdersCustomerGroup;
const searchOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.query.status;
    const keyword = req.query.keyword;
    try {
        const payment = new RegExp(status, "i");
        const order = new RegExp(keyword, "i");
        const results = yield OrderModel_1.default.find({
            payment_status: payment,
            order_status: order,
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
const searchDateOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.query;
    try {
        let parsedStartDate = null;
        let parsedEndDate = null;
        if (startDate && endDate) {
            parsedStartDate = new Date(startDate.toString());
            parsedEndDate = new Date(endDate.toString());
            if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
                throw new Error("Invalid date format. Dates should be in YYYY-MM-DD format.");
            }
            if (parsedStartDate > parsedEndDate) {
                throw new Error("Start date must be before end date.");
            }
        }
        const query = {};
        if (parsedStartDate && parsedEndDate) {
            query.received_date = { $gte: parsedStartDate, $lte: parsedEndDate };
        }
        const populatedOrders = yield OrderModel_1.default.find(query)
            .populate({
            path: "partnerId",
            select: "username phone address",
        })
            .populate({
            path: "customerId",
            select: "username code address phone createdAt",
        })
            .catch((error) => {
            console.error("Error during population:", error);
        });
        return res.status(200).json(populatedOrders);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message || "An error occurred during order search.",
        });
    }
});
exports.searchDateOrders = searchDateOrders;
