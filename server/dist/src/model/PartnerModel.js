"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PartnerSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    staffIncharge: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    payer: {
        type: String,
        enum: ["customer", "shop"],
        default: "shop",
    },
    status: {
        type: String,
        enum: ["active", "passive"],
        default: "active",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("partner", PartnerSchema);
