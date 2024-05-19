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
const StockAdjustmentSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
    },
    generalId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "general",
        required: true,
    },
    staffId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "products",
            },
            inventory_number: {
                type: Number,
                required: true,
                default: 0,
            },
            inventory_discrepancy: {
                type: Number,
                default: 0,
            },
            reason: {
                type: String,
                required: true,
            },
        },
    ],
    desc: {
        type: String,
        required: true,
    },
    stocktaking_day: {
        type: String,
        required: true,
    },
    inventory_status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    },
}, {
    timestamps: true,
});
StockAdjustmentSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const stock = this;
        for (const product of stock.products) {
            const foundProductDoc = yield mongoose_1.default
                .model("products")
                .findById(product.productId);
            if (!foundProductDoc) {
                console.warn(`Product with ID ${product.productId} not found while calculating total price.`);
                continue;
            }
            product.inventory_discrepancy =
                product.inventory_number - foundProductDoc.inventory_number;
        }
        next();
    });
});
StockAdjustmentSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "products.productId",
            select: "name_product code  createdAt",
        });
        next();
    });
});
StockAdjustmentSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "generalId",
            select: "name address createdAt code",
        });
        next();
    });
});
StockAdjustmentSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "staffId",
            select: "username code address phone",
        });
        next();
    });
});
exports.default = mongoose_1.default.model("stock_adjustment", StockAdjustmentSchema);
