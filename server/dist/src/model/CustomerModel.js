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
    city: { type: String },
    district: { type: String },
    ward: { type: String },
    specific_address: { type: String },
    level: { type: String, default: "" },
    phone: { type: String },
    email: { type: String, default: "" },
    birth: { type: String, default: "" },
    tax_code: { type: String },
    website: { type: String },
    note: { type: String },
    opening_balance: {
        type: String,
        default: "",
    },
    balance_increases: {
        type: String,
        default: "",
    },
    balance_decreases: {
        type: String,
        default: "",
    },
    remaining_decreases: {
        type: String,
        default: "",
    },
    ending_balance: {
        type: String,
        default: "",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("customer", CustomerSchema);
