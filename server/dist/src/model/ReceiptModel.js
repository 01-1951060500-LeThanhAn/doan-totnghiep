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
    staffId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
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
ReceiptSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "customerId",
            select: "username code address phone ",
        });
        next();
    });
});
ReceiptSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "staffId",
            select: "username  address phone ",
        });
        next();
    });
});
ReceiptSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "orderId",
            select: "code payment_status",
        });
        next();
    });
});
exports.default = mongoose_1.default.model("receipt_orders", ReceiptSchema);