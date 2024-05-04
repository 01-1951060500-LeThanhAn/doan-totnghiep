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
const WarehouseSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
    },
    delivery_date: {
        type: String,
    },
    totalPrice: Number,
    totalQuantity: Number,
    products: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            inventory_number: {
                type: Number,
                required: true,
            },
        },
    ],
    generalId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "general",
    },
    supplierId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "supplier",
    },
    payment_status: {
        type: String,
        enum: ["delivered", "pending"],
        default: "pending",
    },
    order_status: {
        type: String,
        enum: ["entered", "not-entered"],
        default: "entered",
    },
}, {
    timestamps: true,
});
WarehouseSchema.pre("save", function (next) {
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
exports.default = mongoose_1.default.model("purchase_orders", WarehouseSchema);
