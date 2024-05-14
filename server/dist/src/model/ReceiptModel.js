"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReceiptSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
    },
    submitter: {
        type: String,
        enum: ["customer", "supplier"],
        default: "customer",
    },
    customerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "customer",
    },
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "orders",
    },
    receipt_type: {
        type: String,
        enum: ["debt-customer", "receive-supplier"],
        default: "debt-customer",
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    payment_status: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "paid",
    },
    desc: {
        type: String,
    },
});
exports.default = mongoose_1.default.model("receipt_orders", ReceiptSchema);
