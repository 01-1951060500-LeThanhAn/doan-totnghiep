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
exports.searchOrder = exports.getIncomeOrders = exports.getDetailOrder = exports.deleteOrder = exports.updateOrder = exports.getAllOrder = exports.createOrder = void 0;
const OrderModel_1 = __importDefault(require("../model/OrderModel"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.body.customerId;
        if (!customerId) {
            return res.status(400).json({ message: "customerId is required" });
        }
        const customer = yield CustomerModel_1.default.findById(customerId);
        if (!customer) {
            return res.status(400).json({ message: "customerId not found" });
        }
        const newOrder = new OrderModel_1.default(Object.assign(Object.assign({}, req.body), { customerId: customer._id, payment_status: "unpaid" }));
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
        const carts = yield OrderModel_1.default.find();
        res.status(200).json(carts);
    }
    catch (err) {
        res.status(500).json(err);
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
        const [incomeData, statusData] = yield Promise.all([
            OrderModel_1.default.aggregate([
                {
                    $match: {
                        createdAt: { $gte: previousMonth },
                    },
                },
                {
                    $project: {
                        _id: { $month: "$createdAt" },
                        total_price: "$total_price",
                        total_products: { $sum: 1 },
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        total_income: { $sum: "$total_price" },
                        total_products: { $sum: "$total_products" },
                    },
                },
            ]),
            OrderModel_1.default.aggregate([
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
            ]),
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
