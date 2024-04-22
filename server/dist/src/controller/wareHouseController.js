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
exports.getWareHouseByGeneral = exports.getWareHouseBySupplier = exports.getIncomeWarehouse = exports.deleteWarehouse = exports.getWareHouse = exports.getWareHouseByProduct = exports.createWareHouse = void 0;
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const WarehouseModel_1 = __importDefault(require("../model/WarehouseModel"));
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
const createWareHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { import_price, supplierId, products } = req.body;
        if (!supplierId || !products || products.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const productUpdates = products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const { productId, inventory_number } = product;
            if (!productId || !inventory_number) {
                return res.status(400).json({ message: "Missing product details" });
            }
            const existingProduct = yield ProductModel_1.default.findById(productId);
            if (!existingProduct) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
            yield ProductModel_1.default.findOneAndUpdate({ _id: productId }, { $inc: { inventory_number } }, { upsert: true, new: true });
        }));
        yield Promise.all(productUpdates);
        const totalPrice = import_price * products[0].inventory_number;
        const warehouse = new WarehouseModel_1.default(Object.assign(Object.assign({}, req.body), { totalPrice }));
        yield warehouse.save();
        res.status(200).json(warehouse);
    }
    catch (error) {
        console.error("Error creating warehouse entry:", error);
        res.status(500).json(error);
    }
});
exports.createWareHouse = createWareHouse;
const getWareHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouse = yield WarehouseModel_1.default.find().populate("supplierId products.productId generalId");
        return res.status(200).json(warehouse);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getWareHouse = getWareHouse;
const deleteWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const warehouseId = req.params.id;
    try {
        const deleteProductId = yield WarehouseModel_1.default.findByIdAndDelete(warehouseId);
        if (!deleteProductId) {
            return res.status(401).json({
                message: "Mã đơn nhập hàng không hợp lệ hoặc không tồn tại",
            });
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
                    },
                },
                {
                    $project: {
                        _id: { $month: "$createdAt" },
                        total_quantity: {
                            $sum: "$products.inventory_number",
                        },
                        total_sold_products: "$totalPrice",
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        total_income: { $sum: "$total_quantity" },
                        total_sold_products: { $sum: "$total_sold_products" },
                    },
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
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    try {
        const incomeData = yield WarehouseModel_1.default.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $unwind: "$products", // Unwind the products array
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
                $project: {
                    _id: {
                        month: "$createdAt",
                        productId: "$products.productId",
                    },
                    product_name: { $first: "$product.name_product" },
                    product_code: { $first: "$product.code" },
                    quantity: "$products.inventory_number",
                    price: "$import_price",
                    total_price: {
                        $multiply: ["$products.inventory_number", "$import_price"],
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.productId",
                    month: { $first: "$_id.month" },
                    name: { $first: "$product_name" },
                    code: { $first: "$product_code" },
                    total_quantity: { $sum: "$quantity" },
                    total_income: { $sum: "$total_price" },
                },
            },
        ]);
        res.status(200).json(incomeData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching income data by product" });
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
                    },
                    total_quantity: { $sum: "$products.inventory_number" },
                    total_price: {
                        $sum: "$totalPrice",
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.code",
                    total_quantity: { $sum: "$total_quantity" },
                    total_price: { $sum: "$total_price" },
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
        const pipeline = [
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                },
            },
            {
                $lookup: {
                    from: "purchase_orders",
                    localField: "_id",
                    foreignField: "generalId",
                    as: "purchase_orders",
                },
            },
            {
                $unwind: "$purchase_orders",
            },
            {
                $project: {
                    _id: {
                        general: "$purchase_orders.generalId",
                        month: { $month: "$createdAt" },
                    },
                    quantity: {
                        $sum: "$purchase_orders.products.inventory_number",
                    },
                    total_price: {
                        $sum: "$purchase_orders.totalPrice",
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.general",
                    month: { $first: "$_id.month" },
                    total_products: { $sum: "$quantity" },
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
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching warehouse statistics" });
    }
});
exports.getWareHouseByGeneral = getWareHouseByGeneral;
