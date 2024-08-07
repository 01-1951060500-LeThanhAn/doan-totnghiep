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
exports.getPaymentWarehouseStaff = exports.getWareHouseByOrders = exports.getWareHouseByManager = exports.searchWarehouseOrder = exports.updateWarehouse = exports.getInfoWareHouse = exports.getWareHouseByGeneral = exports.getWareHouseBySupplier = exports.getIncomeWarehouse = exports.deleteWarehouse = exports.getWareHouse = exports.getWareHouseByProduct = exports.createWareHouse = void 0;
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const WarehouseModel_1 = __importDefault(require("../model/WarehouseModel"));
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
const TransactionModel_1 = __importDefault(require("../model/TransactionModel"));
const SupplierModel_1 = __importDefault(require("../model/SupplierModel"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const createWareHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierId, products, delivery_date, generalId, manager } = req.body;
        if (!supplierId ||
            !delivery_date ||
            !generalId ||
            !manager ||
            !products ||
            products.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const supplier = yield SupplierModel_1.default.findById(supplierId);
        if (!supplier) {
            return res.status(400).json({ message: "supplierId not found" });
        }
        for (const product of products) {
            yield ProductModel_1.default.findByIdAndUpdate(product.productId, {
                $inc: { pendingWarehouseQuantity: product.inventory_number },
            });
        }
        const productUpdates = products === null || products === void 0 ? void 0 : products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const { productId, inventory_number } = product;
            if (!productId || !inventory_number) {
                return res.status(400).json({ message: "Missing product details" });
            }
            const existingProduct = yield ProductModel_1.default.findById(productId);
            const existGeneral = yield GeneralDepotModel_1.default.findOne({
                type: "sub",
                _id: req.body.generalId,
            });
            if (!existingProduct) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
            if ((existGeneral === null || existGeneral === void 0 ? void 0 : existGeneral.type) === "sub") {
                const newProduct = new ProductModel_1.default({
                    name_product: existingProduct.name_product,
                    code: existingProduct.code,
                    generalId: existGeneral === null || existGeneral === void 0 ? void 0 : existGeneral._id,
                    manager: req.body.manager,
                    type: existingProduct.type,
                    unit: existingProduct.unit,
                    import_price: existingProduct.import_price,
                    export_price: existingProduct.export_price,
                    inventory_number: inventory_number,
                    status: "stocking",
                    img: existingProduct.img,
                    desc: existingProduct.desc,
                });
                yield newProduct.save();
            }
            else {
                yield ProductModel_1.default.findOneAndUpdate({ _id: productId }, { $inc: { inventory_number } }, { upsert: true, new: true });
            }
        }));
        yield Promise.all([productUpdates]);
        const totalQuantity = products.reduce((acc, product) => acc + Number(product.inventory_number), 0);
        let totalPrice = 0;
        for (const product of products) {
            const productData = yield ProductModel_1.default.findById(product.productId);
            if (!productData) {
                return res
                    .status(400)
                    .json({ message: `Product not found: ${product.productId}` });
            }
            totalPrice = products.reduce((acc, product) => acc +
                Number(product.inventory_number) * Number(productData.import_price), 0);
        }
        const warehouse = new WarehouseModel_1.default(Object.assign(Object.assign({}, req.body), { supplierId: supplier._id, totalQuantity, payment_status: "pending" }));
        const currentBalance = Number(supplier.balance_increases) + Number(supplier.opening_balance);
        yield SupplierModel_1.default.findByIdAndUpdate(supplierId, {
            balance_increases: currentBalance + Number(totalPrice),
            ending_balance: currentBalance + Number(totalPrice),
        });
        const newWarehouse = yield warehouse.save();
        res.status(200).json(newWarehouse);
    }
    catch (error) {
        console.error("Error creating warehouse entry:", error);
        res.status(500).json(error);
    }
});
exports.createWareHouse = createWareHouse;
const getWareHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouse = yield WarehouseModel_1.default.find()
            .populate("supplierId products.productId generalId manager")
            .sort({ createdAt: -1 });
        return res.status(200).json(warehouse);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getWareHouse = getWareHouse;
const getInfoWareHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const warehouseId = req.params.id;
    if (!warehouseId) {
        return res.status(400).json({
            message: "Mã đơn nhập hàng không hợp lệ hoặc không tồn tại",
        });
    }
    try {
        const detailWarehouse = yield WarehouseModel_1.default.findById(warehouseId)
            .populate({
            path: "generalId",
            select: "-products -createdAt -updatedAt",
        })
            .populate({
            path: "supplierId",
            select: "-createdAt -updatedAt -userId -website -desc -tax_code",
        })
            .populate({
            path: "products.productId",
        });
        if (!detailWarehouse) {
            return res.status(401).json({
                message: "Mã đơn nhập hàng không hợp lệ hoặc không tồn tại",
            });
        }
        // const totalPrice = detailWarehouse?.products.reduce(
        //   (acc: number, product: any) =>
        //     acc + product.inventory_number * product.import_price,
        //   0
        // );
        // const totalQuantity = detailWarehouse?.products.reduce(
        //   (acc: number, product: any) => acc + Number(product.inventory_number),
        //   0
        // );
        res.status(200).json(detailWarehouse);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Lỗi khi hiển thị đơn nhập hàng",
        });
    }
});
exports.getInfoWareHouse = getInfoWareHouse;
const updateWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const warehouseId = req.params.id;
    if (!warehouseId) {
        return res.status(400).json({
            message: "Mã đơn nhập hàng không hợp lệ hoặc không tồn tại",
        });
    }
    try {
        const originalWarehouseData = yield WarehouseModel_1.default.findById(warehouseId);
        const updatedWarehouseData = yield WarehouseModel_1.default.findByIdAndUpdate(warehouseId, {
            payment_status: "delivered",
        }, {
            new: true,
        });
        if (!updatedWarehouseData) {
            return res.status(404).json({ message: "Không tìm thấy đơn nhập hàng" });
        }
        const paymentStatusChangedToPaid = (originalWarehouseData === null || originalWarehouseData === void 0 ? void 0 : originalWarehouseData.payment_status) !== "delivered" &&
            (updatedWarehouseData === null || updatedWarehouseData === void 0 ? void 0 : updatedWarehouseData.payment_status) === "delivered";
        if (paymentStatusChangedToPaid) {
            const supplierId = updatedWarehouseData.supplierId;
            const totalPrice = updatedWarehouseData.totalPrice;
            const supplier = yield SupplierModel_1.default.findById(supplierId);
            const currentBalanceIncreases = new decimal_js_1.default((supplier === null || supplier === void 0 ? void 0 : supplier.balance_increases) || 0);
            const currentBalanceDecreases = new decimal_js_1.default((supplier === null || supplier === void 0 ? void 0 : supplier.balance_decreases) || 0);
            const remainingDecreases = decimal_js_1.default.max(currentBalanceIncreases.minus(currentBalanceDecreases), new decimal_js_1.default(0));
            const updatedBalanceDecreases = currentBalanceDecreases.plus(totalPrice);
            const updatedRemainingDecreases = decimal_js_1.default.max(remainingDecreases.minus(totalPrice), new decimal_js_1.default(0));
            yield SupplierModel_1.default.findByIdAndUpdate(supplierId, {
                balance_decreases: updatedBalanceDecreases,
                remaining_decreases: updatedRemainingDecreases,
                ending_balance: updatedRemainingDecreases,
            });
            for (const product of updatedWarehouseData.products) {
                yield ProductModel_1.default.findByIdAndUpdate(product.productId, {
                    $inc: { pendingWarehouseQuantity: -product.inventory_number },
                    $push: {
                        transactionHistory: {
                            orderId: updatedWarehouseData._id,
                            quantity: product.inventory_number,
                            generalId: updatedWarehouseData.generalId,
                            staffId: updatedWarehouseData.manager,
                            inventory_number: product.inventory_number,
                        },
                    },
                });
            }
        }
        if (updatedWarehouseData) {
            yield WarehouseModel_1.default.findByIdAndUpdate(updatedWarehouseData === null || updatedWarehouseData === void 0 ? void 0 : updatedWarehouseData._id, {
                $inc: { totalPrice: -(updatedWarehouseData === null || updatedWarehouseData === void 0 ? void 0 : updatedWarehouseData.totalPrice) },
            });
        }
        if (paymentStatusChangedToPaid) {
            const transactionHistory = new TransactionModel_1.default({
                transaction_type: "import",
                transaction_date: Date.now(),
                totalPrice: updatedWarehouseData === null || updatedWarehouseData === void 0 ? void 0 : updatedWarehouseData.totalSupplierPay,
                warehouseId: updatedWarehouseData === null || updatedWarehouseData === void 0 ? void 0 : updatedWarehouseData._id,
            });
            yield transactionHistory.save();
        }
        console.log(updatedWarehouseData);
        res.status(200).json(updatedWarehouseData);
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Server not found");
    }
});
exports.updateWarehouse = updateWarehouse;
const deleteWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const warehouseId = req.params.id;
    if (!warehouseId) {
        return res.status(400).json({
            message: "Lỗi khi xóa giỏ đơn nhập hàng",
        });
    }
    try {
        const deleteProductId = yield WarehouseModel_1.default.findByIdAndDelete(warehouseId);
        if (!deleteProductId) {
            return res.status(404).json({ message: "Đơn nhập hàng không tồn tại" });
        }
        const supplierId = deleteProductId === null || deleteProductId === void 0 ? void 0 : deleteProductId.supplierId;
        const orderTotalPrice = deleteProductId.totalPrice;
        const supplier = yield SupplierModel_1.default.findById(supplierId);
        if (!supplier) {
            throw new Error(`Supplier not found: ${supplierId}`);
        }
        const currentBalanceIncreases = new decimal_js_1.default(supplier.balance_increases);
        const currentBalanceDecreases = new decimal_js_1.default(supplier.balance_decreases);
        const openingBalance = new decimal_js_1.default(supplier.opening_balance);
        const updatedBalanceIncreases = decimal_js_1.default.max(currentBalanceIncreases.minus(orderTotalPrice), new decimal_js_1.default(0));
        const updatedRemainingDecreases = openingBalance
            .plus(updatedBalanceIncreases)
            .minus(currentBalanceDecreases);
        const updatedEndingBalance = updatedRemainingDecreases;
        yield SupplierModel_1.default.findByIdAndUpdate(supplierId, {
            balance_increases: updatedBalanceIncreases.toString(),
            remaining_decreases: updatedRemainingDecreases.toString(),
            ending_balance: updatedEndingBalance.toString(),
        });
        if (deleteProductId.payment_status === "pending") {
            for (const product of deleteProductId.products) {
                yield ProductModel_1.default.findByIdAndUpdate(product.productId, {
                    $inc: { pendingWarehouseQuantity: -product.inventory_number },
                });
            }
        }
        res.status(200).json({
            message: "Xóa đơn nhập hàng thành công",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi khi xóa đơn nhập hàng",
        });
    }
});
exports.deleteWarehouse = deleteWarehouse;
const getIncomeWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const [incomeData] = yield Promise.all([
            WarehouseModel_1.default.aggregate([
                {
                    $match: {
                        createdAt: { $gte: previousMonth },
                        payment_status: "delivered",
                    },
                },
                {
                    $project: {
                        _id: {
                            $dateToString: { format: "%m/%Y", date: "$createdAt" },
                        },
                        month: { $month: "$createdAt" },
                        totalQuantity: {
                            $sum: "$products.inventory_number",
                        },
                        totalOrders: { $sum: 1 },
                        totalPrice: "$totalSupplierPay",
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
            ]),
        ]);
        res.status(200).json(incomeData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching income and status data" });
    }
});
exports.getIncomeWarehouse = getIncomeWarehouse;
const getWareHouseByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const incomeData = yield WarehouseModel_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    payment_status: "delivered",
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
                    totalPrice: "$totalSupplierPay",
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
        res.status(500).json({ message: "Error fetching income data by customer" });
    }
});
exports.getWareHouseByProduct = getWareHouseByProduct;
const getWareHouseBySupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = yield WarehouseModel_1.default.aggregate([
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
                        $sum: "$totalSupplierPay",
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
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching income data by supplier" });
    }
});
exports.getWareHouseBySupplier = getWareHouseBySupplier;
const getWareHouseByGeneral = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = [
            {
                $lookup: {
                    from: "good_received_notes",
                    localField: "_id",
                    foreignField: "generalId",
                    as: "good_received_notes",
                },
            },
            {
                $unwind: "$good_received_notes",
            },
            {
                $match: {
                    "good_received_notes.payment_status": "delivered",
                },
            },
            {
                $project: {
                    _id: {
                        code: "$good_received_notes.generalId",
                    },
                    quantity: {
                        $first: "$good_received_notes.products.inventory_number",
                    },
                    totalPrice: "$good_received_notes.totalSupplierPay",
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
        const results = yield GeneralDepotModel_1.default.aggregate(incomeData);
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
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching warehouse statistics" });
    }
});
exports.getWareHouseByGeneral = getWareHouseByGeneral;
const getWareHouseByManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    localField: "manager",
                    foreignField: "_id",
                    as: "users",
                },
            },
            {
                $unwind: "$users",
            },
            {
                $project: {
                    generalId: 1,
                    _id: {
                        username: "$users.username",
                        email: "$users.email",
                        month: { $month: "$createdAt" },
                    },
                    totalQuantity: {
                        $sum: "$products.inventory_number",
                    },
                    totalOrders: {
                        $sum: 1,
                    },
                    totalPrice: {
                        $sum: "$totalSupplierPay",
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.code",
                    email: { $first: "$_id.email" },
                    username: { $first: "$_id.username" },
                    month: { $first: "$_id.month" },
                    totalQuantity: { $sum: "$totalQuantity" },
                    totalPrice: { $sum: "$totalPrice" },
                    totalOrders: { $sum: "$totalOrders" },
                },
            },
        ];
        const results = yield WarehouseModel_1.default.aggregate(pipeline);
        res.status(200).json(results);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching warehouse statistics" });
    }
});
exports.getWareHouseByManager = getWareHouseByManager;
const getWareHouseByOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = yield SupplierModel_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $lookup: {
                    from: "good_received_notes",
                    localField: "_id",
                    foreignField: "supplierId",
                    as: "good_received_notes",
                },
            },
            {
                $unwind: "$good_received_notes",
            },
            {
                $project: {
                    _id: {
                        _id: "$good_received_notes._id",
                        code: "$good_received_notes.code",
                    },
                    totalQuantity: {
                        $sum: "$good_received_notes.products.inventory_number",
                    },
                    totalPrice: {
                        $sum: "$good_received_notes.totalSupplierPay",
                    },
                },
            },
            {
                $group: {
                    _id: "$_id._id",
                    code: { $first: "$_id.code" },
                    totalQuantity: { $sum: "$totalQuantity" },
                    totalPrice: { $first: "$totalPrice" },
                },
            },
        ]);
        res.status(200).json(incomeData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching income data by supplier" });
    }
});
exports.getWareHouseByOrders = getWareHouseByOrders;
const getPaymentWarehouseStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                    localField: "manager",
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
                            if: { $eq: ["$order_status", "entered"] },
                            then: 1,
                            else: 0,
                        },
                    },
                    totalPriceDeliveredOnline: {
                        $cond: {
                            if: {
                                $and: [
                                    { $eq: ["$payment_status", "delivered"] },
                                    { $eq: ["$payment_method", "online"] },
                                ],
                            },
                            then: {
                                $multiply: ["$totalSupplierPay"],
                            },
                            else: 0,
                        },
                    },
                    totalPriceDeliveredOffline: {
                        $cond: {
                            if: {
                                $and: [
                                    { $eq: ["$payment_status", "delivered"] },
                                    { $eq: ["$payment_method", "offline"] },
                                ],
                            },
                            then: "$totalSupplierPay",
                            else: 0,
                        },
                    },
                    totalPricePending: {
                        $cond: {
                            if: { $eq: ["$payment_status", "pending"] },
                            then: "$totalSupplierPay",
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
        const results = yield WarehouseModel_1.default.aggregate(pipeline);
        return res.status(200).json(results);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getPaymentWarehouseStaff = getPaymentWarehouseStaff;
const searchWarehouseOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    try {
        const payment = new RegExp(keyword, "i");
        const results = yield WarehouseModel_1.default.find({
            payment_status: payment,
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
exports.searchWarehouseOrder = searchWarehouseOrder;
