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
        ref: "partner",
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    generalId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "general",
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
            totalReturnOrders: {
                type: Number,
                required: true,
                default: 0,
            },
        },
    ],
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    totalCustomerPay: {
        type: Number,
        default: 0,
        required: true,
    },
    totalQuantity: {
        type: Number,
        default: 0,
        required: true,
    },
    totalReturnOrders: {
        type: Number,
        default: 0,
        required: true,
    },
    code: {
        type: String,
    },
    delivery_address: {
        type: String,
    },
    invoice_address: {
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
        enum: ["pending", "delivered", "cancelled"],
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
// OrderSchema.pre("save", async function (next) {
//   const order = this;
//   order.totalPrice = 0;
//   for (const product of order.products) {
//     const productDoc = await mongoose
//       .model("products")
//       .findById(product.productId);
//     if (!productDoc) {
//       console.warn(
//         `Product with ID ${product.productId} not found while calculating total price.`
//       );
//       continue;
//     }
//     order.totalPrice += productDoc.export_price * product.quantity;
//   }
//   next();
// });
OrderSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        order.totalCustomerPay = 0;
        for (const product of order.products) {
            const productDoc = yield mongoose_1.default
                .model("products")
                .findById(product.productId);
            if (!productDoc) {
                console.warn(`Product with ID ${product.productId} not found while calculating total price.`);
                continue;
            }
            order.totalCustomerPay += productDoc.export_price * product.quantity;
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
            select: "username code address phone createdAt",
        });
        next();
    });
});
OrderSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "generalId",
            select: "name address createdAt code",
        });
        next();
    });
});
OrderSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "userId",
            select: "username code address phone",
        });
        next();
    });
});
exports.default = mongoose_1.default.model("orders", OrderSchema);
