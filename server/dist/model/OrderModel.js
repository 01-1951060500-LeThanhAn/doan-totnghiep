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
const OrderSchema = new mongoose_1.default.Schema({
    customerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "customer",
    },
    partnerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "partner",
    },
    products: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    total_price: {
        type: Number,
        default: 0,
        required: true,
    },
    code: {
        type: String,
    },
    payment_status: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid",
    },
    received_date: {
        type: String,
        required: true,
    },
    order_status: {
        type: String,
        enum: ["pending", "delivered", "shipped"],
        default: "pending",
    },
    payment_method: {
        type: String,
        enum: ["online", "offline"],
        default: "offline",
    },
    note: {
        type: String,
        default: "",
    },
    total_ship: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
OrderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        order.total_price = 0;
        for (const product of order.products) {
            const productDoc = yield mongoose_1.default
                .model("products")
                .findById(product.productId);
            if (!productDoc) {
                console.warn(`Product with ID ${product.productId} not found while calculating total price.`);
                continue;
            }
            order.total_price += productDoc.import_price * product.quantity;
        }
        next();
    });
});
OrderSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "partnerId",
            select: "username phone address",
        });
        next();
    });
});
OrderSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "customerId",
            select: "username createdAt",
        });
        next();
    });
});
exports.default = mongoose_1.default.model("orders", OrderSchema);
