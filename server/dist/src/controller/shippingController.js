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
            const { fromGeneralId, toGeneralId, products, transferDate, deliveryDate } = req.body;
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
            const transferredProducts = [];
            const updatePromises = products.map((product) => __awaiter(this, void 0, void 0, function* () {
                const { productId, inventory_number } = product;
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
                transferredProducts.push({
                    productId,
                    inventory_number,
                });
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
                        products: transferredProduct,
                        toGeneralId: subWarehouse._id,
                        fromGeneralId: mainWarehouse._id,
                        deliveryDate,
                        transferDate,
                        status: "pending",
                    });
                    yield newSubProduct.save();
                }
            }));
            yield Promise.all(updatePromises);
            const totalQuantity = products.reduce((acc, product) => acc + Number(product.inventory_number), 0);
            const newTransferOrder = new ShippingWarehouseModel_1.default({
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
            const subProduct = yield ProductModel_1.default.findOne({
                generalId: targetWarehouse._id,
                manager: ships === null || ships === void 0 ? void 0 : ships.manager,
            });
            const results = yield ProductModel_1.default.findById(product.productId);
            if (subProduct) {
                yield ProductModel_1.default.findOneAndUpdate({ _id: subProduct === null || subProduct === void 0 ? void 0 : subProduct._id }, { $inc: { inventory_number } }, { upsert: true, new: true });
            }
            else {
                const newProduct = new ProductModel_1.default(Object.assign(Object.assign({}, results), { name_product: results === null || results === void 0 ? void 0 : results.name_product, desc: results === null || results === void 0 ? void 0 : results.desc, img: results === null || results === void 0 ? void 0 : results.img, export_price: results === null || results === void 0 ? void 0 : results.export_price, import_price: results === null || results === void 0 ? void 0 : results.import_price, unit: results === null || results === void 0 ? void 0 : results.unit, type: results === null || results === void 0 ? void 0 : results.type, status: "stocking", code: results === null || results === void 0 ? void 0 : results.code, inventory_number: inventory_number, generalId: targetWarehouse._id }));
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
            select: "-_id name code", // Select specific product fields (exclude _id)
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
