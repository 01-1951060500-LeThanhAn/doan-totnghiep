"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    total_products: Number,
    status: {
        type: String,
        enum: ["active", "passive"],
        default: "active",
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("category", CategorySchema);
