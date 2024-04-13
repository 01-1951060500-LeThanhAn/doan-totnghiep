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
exports.getWareHouseBySupplier = exports.getIncomeWarehouse = exports.deleteWarehouse = exports.getWareHouse = exports.getWareHouseByProduct = exports.createWareHouse = void 0;
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const WarehouseModel_1 = __importDefault(require("../model/WarehouseModel"));
const createWareHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, inventory_number, import_price, supplierId, payment_status, } = req.body;
        if (!productId || !supplierId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const product = yield ProductModel_1.default.findById(productId);
        if (!product) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        yield ProductModel_1.default.findOneAndUpdate({ _id: productId }, { $inc: { inventory_number: inventory_number } }, { upsert: true, new: true });
        const totalPrice = inventory_number * import_price;
        const warehouse = new WarehouseModel_1.default({
            productId: product._id,
            inventory_number,
            import_price,
            totalPrice,
            payment_status,
            supplierId,
        });
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
        const warehouse = yield WarehouseModel_1.default.find().populate("supplierId productId");
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
                        total_quantity: "$inventory_number",
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
                $lookup: {
                    from: "products",
                    localField: "productId",
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
                        product: "$products.name_product",
                    },
                    total_quantity: "$products.inventory_number",
                    total_price: {
                        $multiply: ["$products.inventory_number", "$products.import_price"],
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.product",
                    total_quantity: { $sum: "$total_quantity" },
                    total_income: { $sum: "$total_price" },
                },
            },
        ]);
        const response = {
            incomeData,
        };
        res.status(200).json(response);
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
                    total_quantity: "$inventory_number",
                    total_price: {
                        $multiply: ["$inventory_number", "$import_price"],
                    },
                },
            },
            {
                $group: {
                    _id: "$_id.code",
                    total_quantity: { $sum: "$total_quantity" },
                    total_income: { $sum: "$total_price" },
                },
            },
        ]);
        const response = {
            incomeData,
        };
        res.status(200).json(response);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching income data by supplier" });
    }
});
exports.getWareHouseBySupplier = getWareHouseBySupplier;
