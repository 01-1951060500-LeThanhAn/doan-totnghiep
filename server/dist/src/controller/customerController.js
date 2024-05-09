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
exports.getTotalCustomer = exports.getHistoryOrder = exports.deleteCustomer = exports.getInfoCustomer = exports.getListCustomer = exports.createCustomer = void 0;
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = new CustomerModel_1.default(Object.assign({}, req.body));
    try {
        yield customer.save();
        res.status(200).json(customer);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.createCustomer = createCustomer;
const getListCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
                $group: {
                    _id: "$_id",
                    customerData: { $first: "$$ROOT" },
                    totalSpending: {
                        $sum: {
                            $cond: {
                                if: { $isArray: "$orders" },
                                then: { $sum: "$orders.totalPrice" },
                                else: 0,
                            },
                        },
                    },
                    totalOrders: { $sum: { $size: "$orders" } },
                },
            },
            {
                $project: {
                    _id: 0,
                    customer: "$customerData",
                    totalSpending: 1,
                    totalOrders: 1,
                },
            },
        ]);
        res.status(200).json(customers);
    }
    catch (error) {
        console.error("Error fetching customers with total spending:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.getListCustomer = getListCustomer;
const getInfoCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        if (!customerId) {
            return res.status(400).json({ message: "Customer not found" });
        }
        const results = yield CustomerModel_1.default.findById(customerId);
        const customer = yield CustomerModel_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(customerId),
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
                $project: {
                    _id: 1,
                    customerId: 1,
                    orders: {
                        _id: 1,
                        products: 1,
                        generalId: 1,
                        totalPrice: 1,
                        payment_status: 1,
                        code: 1,
                        received_date: 1,
                        order_status: 1,
                    },
                },
            },
            {
                $unwind: "$orders",
            },
            {
                $group: {
                    _id: "$_id",
                    totalSpending: {
                        $sum: "$orders.totalPrice",
                    },
                    totalOrders: {
                        $sum: 1,
                    },
                    customerId: {
                        $first: "$customerId",
                    },
                    orders: {
                        $push: "$orders",
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    totalSpending: 1,
                    totalOrders: 1,
                    orders: 1,
                },
            },
        ]);
        return res.status(200).json({
            results,
            orders: customer,
        });
    }
    catch (error) {
        console.error("Error fetching total spending:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});
exports.getInfoCustomer = getInfoCustomer;
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.params.id;
    if (!customerId) {
        return res.status(400).json({
            message: "Lỗi khi xóa khách hàng",
        });
    }
    try {
        const customer = yield CustomerModel_1.default.findById(customerId).populate("orderId");
        if (customer === null || customer === void 0 ? void 0 : customer.orderId) {
            return res.status(400).json({
                message: "Không thể xóa khách hàng vì còn đơn hàng liên quan",
            });
        }
        yield CustomerModel_1.default.findByIdAndDelete(customerId);
        res.status(200).json("Khách hàng đã được xóa.");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteCustomer = deleteCustomer;
const getHistoryOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.params.id;
        if (!customerId) {
            return res.status(400).json({ message: "Customer not found" });
        }
        const customer = yield CustomerModel_1.default.aggregate([
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
                $sort: {
                    "orders.createdAt": -1,
                },
            },
            {
                $project: {
                    _id: 0,
                    orders: {
                        _id: 1,
                        products: 1,
                        totalPrice: 1,
                        payment_status: 1,
                        received_date: 1,
                        order_status: 1,
                    },
                },
            },
        ]);
        if (!customer.length) {
            return res
                .status(404)
                .json({ message: "Customer does not have any orders" });
        }
        return res.status(200).json(customer);
    }
    catch (error) {
        console.error("Error fetching customer with orders:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});
exports.getHistoryOrder = getHistoryOrder;
const getTotalCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const incomeData = yield CustomerModel_1.default.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: lastYear,
                    },
                },
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt",
                    },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: 1,
                    },
                },
            },
        ]);
        res.status(200).json(incomeData);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred" });
    }
});
exports.getTotalCustomer = getTotalCustomer;
