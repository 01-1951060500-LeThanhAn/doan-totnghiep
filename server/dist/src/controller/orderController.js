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
exports.getIncomeOrdersCustomerGroup = exports.getIncomeOrdersArea = exports.getIncomeOrdersProduct = exports.getRevenueOrdersCustomer = exports.getIncomeOrdersGeneral = exports.searchDateOrders = exports.searchOrder = exports.getPaymentOrderStaff = exports.getPaymentOrderTime = exports.getShipmentOrderGeneral = exports.getShipmentOrderPartner = exports.getShipmentOrdersStaff = exports.getShipmentOrdersTime = exports.getRevenueOrdersGeneral = exports.getRevenueOrdersCustomerGroup = exports.getRevenueOrdersProducts = exports.getRevenueOrdersStaff = exports.getRevenueOrdersMonth = exports.getIncomeOrders = exports.getDetailOrder = exports.deleteOrder = exports.updateOrder = exports.getAllOrder = exports.createOrder = void 0;
const OrderModel_1 = __importDefault(require("../model/OrderModel"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const TransactionModel_1 = __importDefault(require("../model/TransactionModel"));
const PartnerModel_1 = __importDefault(require("../model/PartnerModel"));
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
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
            totalQuantity, totalPrice: totalPrice, payment_status: "unpaid", products: products.map((product) => (Object.assign(Object.assign({}, product), { totalReturnOrders: product.quantity }))) }));
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
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = req.user;
        if (!user || !(user === null || user === void 0 ? void 0 : user.role)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let orders = [];
        if ((user === null || user === void 0 ? void 0 : user.role) === "admin") {
            orders = yield OrderModel_1.default.find()
                .populate("userId products.productId")
                .sort({ createdAt: -1 });
        }
        else if ((user === null || user === void 0 ? void 0 : user.role) === "manager") {
            orders = yield OrderModel_1.default.find({ userId: user._id })
                .populate("userId products.productId")
                .sort({ createdAt: -1 });
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
        const OrderStatusChangedToCancelled = (originalOrder === null || originalOrder === void 0 ? void 0 : originalOrder.order_status) !== "cancelled" &&
            (updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.order_status) === "cancelled";
        const OrderStatusChangedToDelivered = (originalOrder === null || originalOrder === void 0 ? void 0 : originalOrder.order_status) !== "delivered" &&
            (updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.order_status) === "delivered";
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
        if (OrderStatusChangedToCancelled) {
            for (const product of updatedOrder.products) {
                yield ProductModel_1.default.findByIdAndUpdate(product.productId, {
                    $inc: { pendingOrderQuantity: -product.quantity },
                });
            }
        }
        if (OrderStatusChangedToDelivered) {
            const transactionHistory = new TransactionModel_1.default({
                transaction_type: "order",
                transaction_date: Date.now(),
                orderId: updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder._id,
                totalPrice: updatedOrder === null || updatedOrder === void 0 ? void 0 : updatedOrder.totalCustomerPay,
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
        const deletedOrder = yield OrderModel_1.default.findByIdAndDelete(cartId);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Đơn hàng không tồn tại" });
        }
        const customerId = deletedOrder.customerId;
        const orderTotalPrice = deletedOrder.totalPrice;
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
        res.status(500).json({ message: "Server error" });
    }
});
exports.getRevenueOrdersStaff = getRevenueOrdersStaff;
const getIncomeOrdersGeneral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = yield OrderModel_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $lookup: {
                    from: "general",
                    localField: "generalId",
                    foreignField: "_id",
                    as: "general",
                },
            },
            {
                $unwind: "$general",
            },
            {
                $project: {
                    _id: {
                        name: "$general.name",
                    },
                    totalPrice: "$totalCustomerPay",
                    totalOrders: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id.name",
                    totalPrice: { $sum: "$totalPrice" },
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
exports.getIncomeOrdersGeneral = getIncomeOrdersGeneral;
const getRevenueOrdersProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = yield OrderModel_1.default.aggregate([
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
                    totalPrice: "$totalCustomerPay",
                    totalOrders: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    name_product: { $first: "$productName" },
                    code: { $first: "$productCode" },
                    totalPrice: { $sum: "$totalPrice" },
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
exports.getRevenueOrdersProducts = getRevenueOrdersProducts;
const getRevenueOrdersCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    pipeline: [{ $match: { payment_status: "paid" } }],
                },
            },
            {
                $unwind: "$orders",
            },
            {
                $project: {
                    _id: {
                        customer: "$orders.customerId",
                    },
                    date: {
                        $dateToString: { format: "%d/%m/%Y", date: "$createdAt" },
                    },
                    month: { $month: "$createdAt" },
                    quantity: {
                        $sum: {
                            $cond: [
                                { $eq: ["$orders.payment_status", "paid"] },
                                "$orders.products.quantity",
                                0,
                            ],
                        },
                    },
                    totalOrders: {
                        $sum: {
                            $cond: [{ $eq: ["$orders.payment_status", "paid"] }, 1, 0],
                        },
                    },
                    totalPrice: {
                        $sum: {
                            $cond: [
                                { $eq: ["$orders.payment_status", "paid"] },
                                "$orders.totalCustomerPay",
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.customer",
                    date: { $first: "$date" },
                    month: { $first: "$month" },
                    total_quantity: { $sum: "$quantity" },
                    totalOrders: { $sum: "$totalOrders" },
                    totalPrice: { $sum: "$totalPrice" },
                },
            },
            {
                $sort: { month: 1 },
            },
        ]);
        const enrichedResults = [];
        for (const result of results) {
            const customerId = result._id;
            const customer = yield CustomerModel_1.default.findById(customerId);
            if (customer) {
                const enrichedResult = Object.assign(Object.assign({}, result), { name: customer.username, code: customer.code });
                enrichedResults.push(enrichedResult);
            }
        }
        return res.status(200).json(enrichedResults);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching income data by customer" });
    }
});
exports.getRevenueOrdersCustomer = getRevenueOrdersCustomer;
const getRevenueOrdersCustomerGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    totalOrders: { $sum: 1 },
                    quantity: {
                        $first: "$orders.products.quantity",
                    },
                    totalPrice: "$orders.totalCustomerPay",
                },
            },
            {
                $group: {
                    _id: "$_id.type",
                    totalQuantity: { $sum: "$quantity" },
                    totalOrders: { $sum: "$totalOrders" },
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
exports.getRevenueOrdersCustomerGroup = getRevenueOrdersCustomerGroup;
const getRevenueOrdersGeneral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const results = yield GeneralDepotModel_1.default.aggregate([
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
                        general: "$orders.generalId",
                        payment_method: "$orders.payment_method",
                    },
                    date: {
                        $dateToString: { format: "%d/%m/%Y", date: "$createdAt" },
                    },
                    month: { $month: "$createdAt" },
                    quantity: {
                        $first: "$orders.products.quantity",
                    },
                    totalOrders: { $sum: 1 },
                    totalPrice: "$orders.totalCustomerPay",
                },
            },
            {
                $group: {
                    _id: "$_id.general",
                    totalQuantity: { $sum: "$quantity" },
                    totalOrders: { $sum: "$totalOrders" },
                    totalPrice: { $sum: "$totalPrice" },
                },
            },
        ]);
        const enrichedResults = [];
        for (const result of results) {
            const generalId = result._id;
            const general = yield GeneralDepotModel_1.default.findById(generalId);
            if (general) {
                const enrichedResult = Object.assign(Object.assign({}, result), { name: general.name, code: general.code });
                enrichedResults.push(enrichedResult);
            }
        }
        return res.status(200).json(enrichedResults);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching income data by general" });
    }
});
exports.getRevenueOrdersGeneral = getRevenueOrdersGeneral;
const getShipmentOrdersTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const incomeData = yield OrderModel_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    order_status: "delivered",
                },
            },
            {
                $project: {
                    _id: { $dateToString: { format: "%m/%Y", date: "$createdAt" } },
                    month: {
                        $month: "$createdAt",
                    },
                    totalPrice: "$totalCustomerPay",
                    total_orders: { $sum: 1 },
                    totalQuantity: {
                        $sum: "$products.quantity",
                    },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    month: { $first: "$month" },
                    totalPrice: { $sum: "$totalPrice" },
                    totalOrders: { $sum: "$total_orders" },
                    totalQuantity: { $sum: "$totalQuantity" },
                },
            },
            {
                $sort: { month: 1 },
            },
        ]);
        res.status(200).json(incomeData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching income and status data" });
    }
});
exports.getShipmentOrdersTime = getShipmentOrdersTime;
const getShipmentOrdersStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    },
                    totalDeliveredOrders: {
                        $cond: {
                            if: { $eq: ["$order_status", "delivered"] },
                            then: 1,
                            else: 0,
                        },
                    },
                    totalPendingOrders: {
                        $cond: {
                            if: { $eq: ["$order_status", "pending"] },
                            then: 1,
                            else: 0,
                        },
                    },
                    totalPriceDelivered: {
                        $cond: {
                            if: { $eq: ["$order_status", "delivered"] },
                            then: "$totalCustomerPay",
                            else: 0,
                        },
                    },
                    totalPricePending: {
                        $cond: {
                            if: { $eq: ["$order_status", "pending"] },
                            then: "$totalCustomerPay",
                            else: 0,
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$_id._id",
                    email: { $first: "$_id.email" },
                    username: { $first: "$_id.username" },
                    // totalOrders: {
                    //   $sum: { $add: ["$totalDeliveredOrders", "$totalPendingOrders"] },
                    // },
                    // totalPrice: {
                    //   $sum: { $add: ["$totalPriceDelivered", "$totalPricePending"] },
                    // },
                    totalDeliveredOrders: { $sum: "$totalDeliveredOrders" },
                    totalPendingOrders: { $sum: "$totalPendingOrders" },
                    totalPriceDelivered: { $sum: "$totalPriceDelivered" },
                    totalPricePending: { $sum: "$totalPricePending" },
                },
            },
        ];
        const results = yield OrderModel_1.default.aggregate(pipeline);
        res.status(200).json(results);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getShipmentOrdersStaff = getShipmentOrdersStaff;
const getShipmentOrderPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    foreignField: "partnerId",
                    as: "orders",
                },
            },
            {
                $unwind: "$orders",
            },
            {
                $match: {
                    "orders.payment_status": "paid",
                },
            },
            {
                $project: {
                    _id: {
                        partner: "$orders.partnerId",
                    },
                    quantity: {
                        $first: "$orders.products.quantity",
                    },
                    totalOrders: { $sum: 1 },
                    totalPrice: "$orders.totalCustomerPay",
                },
            },
            {
                $group: {
                    _id: "$_id.partner",
                    totalQuantity: { $sum: "$quantity" },
                    totalOrders: { $sum: "$totalOrders" },
                    totalPrice: { $sum: "$totalPrice" },
                },
            },
        ];
        const results = yield PartnerModel_1.default.aggregate(pineline);
        const enrichedResults = [];
        for (const result of results) {
            const partnerId = result._id;
            const partner = yield PartnerModel_1.default.findById(partnerId);
            if (partner) {
                const enrichedResult = Object.assign(Object.assign({}, result), { username: partner.username, code: partner.code });
                enrichedResults.push(enrichedResult);
            }
        }
        return res.status(200).json(enrichedResults);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Error fetching shipment data by partner" });
    }
});
exports.getShipmentOrderPartner = getShipmentOrderPartner;
const getShipmentOrderGeneral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const pipeline = [
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
                $match: {
                    "orders.payment_status": "paid",
                },
            },
            {
                $project: {
                    _id: {
                        code: "$orders.generalId",
                    },
                    quantity: {
                        $first: "$orders.products.quantity",
                    },
                    totalPrice: "$orders.totalCustomerPay",
                },
            },
            {
                $group: {
                    _id: "$_id.code",
                    totalOrders: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalPrice: { $sum: "$totalPrice" },
                },
            },
        ];
        const results = yield GeneralDepotModel_1.default.aggregate(pipeline);
        const enrichedResults = [];
        for (const result of results) {
            const generalId = result._id;
            const general = yield GeneralDepotModel_1.default.findById(generalId);
            if (general) {
                const enrichedResult = Object.assign(Object.assign({}, result), { name: general.name, code: general.code });
                enrichedResults.push(enrichedResult);
            }
        }
        res.status(200).json(enrichedResults);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getShipmentOrderGeneral = getShipmentOrderGeneral;
const getPaymentOrderTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                        $dateToString: { format: "%d/%m/%Y", date: "$createdAt" },
                    },
                    date: {
                        $dateToString: { format: "%m/%Y", date: "$createdAt" },
                    },
                    month: { $month: "$createdAt" },
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
                    date: { $first: "$date" },
                    totalPrice: { $sum: "$totalPrice" },
                    totalOrders: { $sum: "$total_orders" },
                },
            },
            {
                $sort: {
                    month: 1,
                    date: 1,
                    _id: 1,
                },
            },
        ]);
        res.status(200).json(incomeData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching income and status data" });
    }
});
exports.getPaymentOrderTime = getPaymentOrderTime;
const getPaymentOrderStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    },
                    totalDeliveredOrders: {
                        $cond: {
                            if: { $eq: ["$order_status", "delivered"] },
                            then: 1,
                            else: 0,
                        },
                    },
                    totalPendingOrders: {
                        $cond: {
                            if: { $eq: ["$order_status", "pending"] },
                            then: 1,
                            else: 0,
                        },
                    },
                    totalPriceDeliveredOnline: {
                        $cond: {
                            if: {
                                $and: [
                                    { $eq: ["$payment_status", "paid"] },
                                    { $eq: ["$payment_method", "online"] },
                                ],
                            },
                            then: {
                                $multiply: ["$totalCustomerPay"],
                            },
                            else: 0,
                        },
                    },
                    totalPriceDeliveredOffline: {
                        $cond: {
                            if: {
                                $and: [
                                    { $eq: ["$payment_status", "paid"] },
                                    { $eq: ["$payment_method", "offline"] },
                                ],
                            },
                            then: "$totalCustomerPay",
                            else: 0,
                        },
                    },
                    totalPricePending: {
                        $cond: {
                            if: { $eq: ["$payment_status", "unpaid"] },
                            then: "$totalCustomerPay",
                            else: 0,
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$_id._id",
                    email: { $first: "$_id.email" },
                    username: { $first: "$_id.username" },
                    totalDeliveredOrders: { $sum: "$totalDeliveredOrders" },
                    totalPendingOrders: { $sum: "$totalPendingOrders" },
                    totalPriceDelivered: {
                        $sum: {
                            $add: [
                                "$totalPriceDeliveredOnline",
                                "$totalPriceDeliveredOffline",
                            ],
                        },
                    },
                    totalPriceDeliveredOnline: { $sum: "$totalPriceDeliveredOnline" },
                    totalPriceDeliveredOffline: { $sum: "$totalPriceDeliveredOffline" },
                    totalPricePending: { $sum: "$totalPricePending" },
                },
            },
        ];
        const results = yield OrderModel_1.default.aggregate(pipeline);
        res.status(200).json(results);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getPaymentOrderStaff = getPaymentOrderStaff;
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
        let parsedStartDate;
        let parsedEndDate;
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
        const populatedOrders = yield OrderModel_1.default.find({
            createdAt: { $gte: startDate, $lte: endDate },
        })
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
