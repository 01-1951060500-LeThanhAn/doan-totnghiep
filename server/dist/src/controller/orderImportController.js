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
exports.getIncomePurchaseOrdersSuppliers = exports.getIncomePurchaseOrdersProducts = exports.getIncomePurchaseOrders = exports.deleteImportOrder = exports.getDetailImportOrder = exports.updateImportOrder = exports.getAllOrderImport = exports.createImportOrder = void 0;
const ImportOrderModel_1 = __importDefault(require("../model/ImportOrderModel"));
const WarehouseModel_1 = __importDefault(require("../model/WarehouseModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const SupplierModel_1 = __importDefault(require("../model/SupplierModel"));
const createImportOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierId, products } = req.body;
        if (!supplierId || !products || products.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const totalQuantity = products.reduce((acc, product) => acc + Number(product.inventory_number), 0);
        const supplier = yield SupplierModel_1.default.findById(supplierId);
        if (!supplier) {
            return res.status(400).json({ message: "supplierId not found" });
        }
        let totalPrice = 0;
        for (const product of products) {
            const productData = yield ProductModel_1.default.findById(product.productId);
            if (!productData) {
                return res
                    .status(400)
                    .json({ message: `Product not found: ${product.productId}` });
            }
            totalPrice = products.reduce((acc, product) => acc +
                Number(product.inventory_number) * Number(productData.export_price), 0);
        }
        const newImportOrder = new ImportOrderModel_1.default(Object.assign(Object.assign({}, req.body), { totalQuantity }));
        const currentBalance = supplier.balance_increases + supplier.opening_balance;
        yield SupplierModel_1.default.findByIdAndUpdate(supplierId, {
            balance_increases: currentBalance + totalPrice,
            ending_balance: currentBalance + totalPrice,
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
        const orders = yield ImportOrderModel_1.default.find()
            .populate("products.productId supplierId generalId")
            .sort({ createdAt: -1 });
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
            const { productId, inventory_number } = product;
            if (!productId || !inventory_number) {
                return res.status(400).json({ message: "Missing product details" });
            }
            yield ProductModel_1.default.findOneAndUpdate({ _id: productId }, {
                $inc: {
                    pendingWarehouseQuantity: product.inventory_number,
                    inventory_number: inventory_number,
                },
            }, { upsert: true, new: true });
        }));
        yield Promise.all(productUpdates);
        const totalQuantity = order.products.reduce((acc, product) => acc + Number(product.inventory_number), 0);
        const newWarehouseEntry = new WarehouseModel_1.default({
            code: order.code,
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
const getIncomePurchaseOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = yield ImportOrderModel_1.default.aggregate([
            {
                $match: {
                    updatedAt: { $gte: previousMonth },
                    order_status: "entered",
                },
            },
            {
                $project: {
                    _id: {
                        $dateToString: { format: "%m/%Y", date: "$updatedAt" },
                    },
                    month: { $month: "$updatedAt" },
                    totalQuantity: {
                        $sum: "$products.inventory_number",
                    },
                    totalOrders: { $sum: 1 },
                    totalPrice: "$totalPrice",
                },
            },
            {
                $group: {
                    _id: "$_id",
                    month: { $first: "$month" },
                    totalQuantity: { $sum: "$totalQuantity" },
                    totalPrice: { $sum: "$totalPrice" },
                    totalOrders: { $sum: "$totalOrders" },
                },
            },
            {
                $sort: { month: 1 },
            },
        ]);
        return res.status(200).json(incomeData);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Error fetching income and purchase orders data" });
    }
});
exports.getIncomePurchaseOrders = getIncomePurchaseOrders;
const getIncomePurchaseOrdersProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const pipeline = [
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    order_status: "entered",
                },
            },
            {
                $unwind: "$products",
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $unwind: "$product",
            },
            {
                $project: {
                    productId: "$product._id",
                    productName: "$product.name_product",
                    productCode: "$product.code",
                    quantity: "$products.inventory_number",
                    price: "$product.export_price",
                    totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
                },
            },
            {
                $group: {
                    _id: "$productId",
                    productName: { $first: "$productName" },
                    productCode: { $first: "$productCode" },
                    totalQuantity: { $sum: "$quantity" },
                    totalPrice: { $sum: "$totalPrice" },
                    price: { $first: "$price" },
                },
            },
        ];
        const results = yield ImportOrderModel_1.default.aggregate(pipeline);
        res.status(200).json(results);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getIncomePurchaseOrdersProducts = getIncomePurchaseOrdersProducts;
const getIncomePurchaseOrdersSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = yield ImportOrderModel_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $lookup: {
                    from: "suppliers",
                    localField: "supplierId",
                    foreignField: "_id",
                    as: "suppliers",
                },
            },
            {
                $unwind: "$suppliers",
            },
            {
                $project: {
                    _id: {
                        month: { $month: "$createdAt" },
                        supplier: "$suppliers.supplier_name",
                        code: "$suppliers.supplier_code",
                        _id: "$suppliers._id",
                        name: "$suppliers.supplier_name",
                    },
                    totalQuantity: { $sum: "$products.inventory_number" },
                    totalOrders: { $sum: 1 },
                    totalPrice: {
                        $sum: "$totalPrice",
                    },
                },
            },
            {
                $group: {
                    _id: "$_id._id",
                    name: { $first: "$_id.name" },
                    code: { $first: "$_id.code" },
                    month: { $first: "$_id.month" },
                    totalQuantity: { $sum: "$totalQuantity" },
                    totalPrice: { $sum: "$totalPrice" },
                    totalOrders: { $sum: "$totalOrders" },
                },
            },
        ]);
        res.status(200).json(incomeData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching income data by supplier" });
    }
});
exports.getIncomePurchaseOrdersSuppliers = getIncomePurchaseOrdersSuppliers;
