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
exports.getDetailShippets = exports.updateShippets = exports.deleteShippets = exports.getShippets = exports.createShippets = void 0;
const ShippingWarehouseModel_1 = __importDefault(require("../model/ShippingWarehouseModel"));
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const TransactionModel_1 = __importDefault(require("../model/TransactionModel"));
function createShippets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fromGeneralId, toGeneralId, products, transferDate, deliveryDate, code, } = req.body;
            if (!fromGeneralId || !toGeneralId || !products || products.length === 0) {
                res.status(403).json("Invalid transfer data provided");
            }
            const mainWarehouse = yield GeneralDepotModel_1.default.findOne({
                type: "main",
                _id: fromGeneralId,
            });
            const subWarehouse = yield GeneralDepotModel_1.default.findOne({
                type: "sub",
                _id: toGeneralId,
            });
            if (!mainWarehouse || !subWarehouse) {
                throw new Error("Invalid warehouse selection for transfer");
            }
            const updatePromises = products.map((product) => __awaiter(this, void 0, void 0, function* () {
                const { productId, inventory_number } = product;
                if (!productId || !inventory_number) {
                    return res.status(400).json({ message: "Missing product details" });
                }
                const existingProduct = yield ProductModel_1.default.findById(productId);
                const existGeneral = yield GeneralDepotModel_1.default.findOne({
                    type: "sub",
                    _id: req.body.toGeneralId,
                });
                if (!existingProduct) {
                    return res.status(400).json({ message: "Invalid product ID" });
                }
                const mainProduct = yield ProductModel_1.default.findOne({
                    _id: productId,
                    generalId: mainWarehouse._id,
                });
                const subProduct = yield ProductModel_1.default.findOne({
                    generalId: subWarehouse._id,
                    _id: productId,
                });
                if (mainProduct) {
                    mainProduct.inventory_number -= inventory_number;
                    yield mainProduct.save();
                }
                if (subProduct) {
                    subProduct.inventory_number += +inventory_number;
                    yield subProduct.save();
                }
                else {
                    const transferredProduct = {
                        productId,
                        inventory_number,
                    };
                    const newSubProduct = new ShippingWarehouseModel_1.default({
                        code,
                        products: transferredProduct,
                        toGeneralId: subWarehouse._id,
                        fromGeneralId: mainWarehouse._id,
                        deliveryDate,
                        transferDate,
                        status: "pending",
                    });
                    yield newSubProduct.save();
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
            yield Promise.all(updatePromises);
            const totalQuantity = products.reduce((acc, product) => acc + Number(product.inventory_number), 0);
            const newTransferOrder = new ShippingWarehouseModel_1.default({
                code,
                fromGeneralId: mainWarehouse._id,
                toGeneralId: subWarehouse._id,
                products,
                transferDate,
                totalQuantity,
                deliveryDate: new Date().toISOString(),
                status: "pending",
            });
            res.status(200).json(newTransferOrder);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    });
}
exports.createShippets = createShippets;
const getShippets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ships = yield ShippingWarehouseModel_1.default.find().populate({
            path: "toGeneralId",
            select: "username email address",
        });
        return res.status(200).json(ships);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getShippets = getShippets;
const deleteShippets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shippId = req.params.id;
    if (!shippId) {
        return res
            .status(400)
            .json({ message: "Missing required data for transfer." });
    }
    try {
        const ships = yield ShippingWarehouseModel_1.default.findByIdAndDelete(shippId);
        if (!ships) {
            return res.status(400).json({ message: "Shipping not found" });
        }
        res.status(200).json({ message: "Shipping deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.deleteShippets = deleteShippets;
const updateShippets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shippId = req.params.id;
    try {
        const ships = yield ShippingWarehouseModel_1.default.findById(shippId);
        if (!ships) {
            return res.status(404).json({ message: "Shipping not found" });
        }
        const data = yield ShippingWarehouseModel_1.default.findByIdAndUpdate(shippId, req.body, {
            new: true,
        });
        const targetWarehouse = yield GeneralDepotModel_1.default.findOne({
            type: "sub",
            _id: ships.toGeneralId,
        });
        if (!targetWarehouse) {
            return res.status(400).json({ message: "Warehouse not found" });
        }
        for (let product of ships.products) {
            const { inventory_number, productId } = product;
            const results = yield ProductModel_1.default.findById(product.productId);
            if (!results) {
                return res.status(400).json({ message: "Product not found" });
            }
            if (!productId) {
                return res.status(400).json({ message: "Product not found" });
            }
            const subProduct = yield ProductModel_1.default.findOne({
                generalId: targetWarehouse._id,
                manager: ships === null || ships === void 0 ? void 0 : ships.manager,
            });
            if (subProduct) {
                yield ProductModel_1.default.findOneAndUpdate({ _id: productId }, { $inc: { inventory_number } }, { upsert: true, new: true });
            }
            else {
                const newProduct = new ProductModel_1.default({
                    name_product: results === null || results === void 0 ? void 0 : results.name_product,
                    desc: results === null || results === void 0 ? void 0 : results.desc,
                    img: results === null || results === void 0 ? void 0 : results.img,
                    export_price: results === null || results === void 0 ? void 0 : results.export_price,
                    import_price: results === null || results === void 0 ? void 0 : results.import_price,
                    unit: results === null || results === void 0 ? void 0 : results.unit,
                    type: results === null || results === void 0 ? void 0 : results.type,
                    status: "stocking",
                    code: results === null || results === void 0 ? void 0 : results.code,
                    inventory_number: inventory_number,
                    generalId: targetWarehouse._id,
                });
                yield newProduct.save();
            }
        }
        const transactionHistory = new TransactionModel_1.default({
            transaction_type: "export",
            transaction_date: Date.now(),
            shipId: data === null || data === void 0 ? void 0 : data._id,
        });
        yield transactionHistory.save();
        res.status(200).json({ message: "Shipping updated" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.updateShippets = updateShippets;
const getDetailShippets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shipId = req.params.id;
    if (!shipId) {
        return res.status(400).json({ message: "Missing required data." });
    }
    try {
        const results = yield ShippingWarehouseModel_1.default.findById(shipId)
            .populate({
            path: "fromGeneralId",
            select: "name type address manager",
        })
            .populate({
            path: "toGeneralId",
            select: "name type address manager",
        })
            .populate({
            path: "products.productId",
        });
        if (!results) {
            return res.status(404).json({ message: "Shipping not found" });
        }
        return res.status(200).json(results);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getDetailShippets = getDetailShippets;
