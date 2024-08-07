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
const mongoose_1 = __importDefault(require("mongoose"));
const ShippingWarehouseModel = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
    },
    fromGeneralId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "general",
        required: true,
    },
    manager: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    toGeneralId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "general",
        required: true,
    },
    products: [
        {
            inventory_number: {
                type: Number,
                required: true,
            },
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "products",
            },
        },
    ],
    totalPrice: Number,
    totalQuantity: Number,
    transferDate: {
        type: String,
        required: true,
    },
    deliveryDate: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "inTransit", "completed", "failed"],
        default: "pending",
    },
});
ShippingWarehouseModel.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "toGeneralId",
            select: "address name type ",
        });
        next();
    });
});
ShippingWarehouseModel.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "fromGeneralId",
            select: "address name type ",
        });
        next();
    });
});
ShippingWarehouseModel.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        order.totalPrice = 0;
        for (const product of order.products) {
            const productDoc = yield mongoose_1.default
                .model("products")
                .findById(product.productId);
            if (!productDoc) {
                console.warn(`Product with ID ${product.productId} not found while calculating total price.`);
                continue;
            }
            order.totalPrice += productDoc.export_price * product.inventory_number;
        }
        next();
    });
});
exports.default = mongoose_1.default.model("shipping_warehouse", ShippingWarehouseModel);
