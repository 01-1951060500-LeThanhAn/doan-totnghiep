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
const ReturnOrderSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
    },
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "orders",
    },
    customerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "customer",
    },
    generalId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "general",
    },
    return_reason: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "products",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            totalReturnQuantity: {
                type: Number,
                default: 0,
            },
        },
    ],
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    status: {
        type: String,
        default: "received",
        enum: ["received", "not-received"],
    },
    refund_status: {
        type: String,
        default: "not-refund",
        enum: ["refunded", "not-refund"],
    },
}, {
    timestamps: true,
});
ReturnOrderSchema.pre("save", function (next) {
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
            order.totalPrice += productDoc.export_price * product.quantity;
        }
        next();
    });
});
ReturnOrderSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "customerId",
            select: "username code address phone",
        });
        next();
    });
});
ReturnOrderSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "generalId",
            select: "name address  code",
        });
        next();
    });
});
ReturnOrderSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "orderId",
            select: "code",
        });
        next();
    });
});
exports.default = mongoose_1.default.model("return_orders", ReturnOrderSchema);
