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
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("partner", PartnerSchema);
