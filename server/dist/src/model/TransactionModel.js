"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    transaction_type: {
        type: String,
        required: true,
        enum: ["import", "export", "order"],
    },
    transaction_date: { type: Date, required: true, default: Date.now },
    orderId: { type: mongoose_1.default.Types.ObjectId, ref: "orders" },
    shipId: { type: mongoose_1.default.Types.ObjectId, ref: "shipping_warehouse" },
    warehouseId: { type: mongoose_1.default.Types.ObjectId, ref: "purchase_orders" },
});
exports.default = mongoose_1.default.model("transactions", TransactionSchema);
