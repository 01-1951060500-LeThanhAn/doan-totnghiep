"use strict";
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
            import_price: {
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
exports.default = mongoose_1.default.model("purchase_orders", WarehouseSchema);
