"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const SupplierSchema = new mongoose_1.default.Schema({
    supplier_name: {
        type: String,
        required: true,
    },
    supplier_code: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email_supplier: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default,
            msg: "Email error",
        },
    },
    address_supplier: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("supplier", SupplierSchema);
