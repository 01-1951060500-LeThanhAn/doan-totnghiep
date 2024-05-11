"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CustomerSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    specific_address: { type: String, required: true },
    level: { type: String, default: "" },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    birth: { type: String, default: "" },
    tax_code: { type: String, required: true },
    website: { type: String },
    note: { type: String },
    opening_balance: {
        type: Number,
        default: 0,
    },
    balance_increases: {
        type: Number,
        default: 0,
    },
    balance_decreases: {
        type: Number,
        default: 0,
    },
    remaining_decreases: {
        type: Number,
        default: 0,
    },
    ending_balance: {
        type: Number,
        default: 0,
    },
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "orders" },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("customer", CustomerSchema);
