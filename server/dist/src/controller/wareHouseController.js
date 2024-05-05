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
exports.updateWarehouse = exports.getInfoWareHouse = exports.getWareHouseByGeneral = exports.getWareHouseBySupplier = exports.getIncomeWarehouse = exports.deleteWarehouse = exports.getWareHouse = exports.getWareHouseByProduct = exports.createWareHouse = void 0;
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const WarehouseModel_1 = __importDefault(require("../model/WarehouseModel"));
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
const createWareHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { supplierId, products } = req.body;
        if (!supplierId || !products || products.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
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
                yield ProductModel_1.default.findOneAndUpdate({ _id: productId, generalId: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.generalId }, { $inc: { inventory_number } }, { upsert: true, new: true });
            }
        }));
        yield Promise.all([productUpdates]);
        const totalQuantity = products.reduce((acc, product) => acc + Number(product.inventory_number), 0);
        const warehouse = new WarehouseModel_1.default(Object.assign(Object.assign({}, req.body), { totalQuantity }));
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
        const totalPrice = detailWarehouse === null || detailWarehouse === void 0 ? void 0 : detailWarehouse.products.reduce((acc, product) => acc + product.inventory_number * product.import_price, 0);
        const totalQuantity = detailWarehouse === null || detailWarehouse === void 0 ? void 0 : detailWarehouse.products.reduce((acc, product) => acc + Number(product.inventory_number), 0);
        const results = {
            detailWarehouse,
            totalPrice,
            totalQuantity,
        };
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
        const updatedWarehouseData = yield WarehouseModel_1.default.findByIdAndUpdate(warehouseId, {
            payment_status: "delivered",
        }, {
            new: true,
        });
        yield (updatedWarehouseData === null || updatedWarehouseData === void 0 ? void 0 : updatedWarehouseData.save());
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
                        $multiply: ["$products.inventory_number", "$products.import_price"],
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
