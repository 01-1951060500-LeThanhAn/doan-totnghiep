"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length > 3,
            msg: "Username error",
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default,
            msg: "Email error",
        },
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        default: "",
    },
    picture: {
        type: String,
        default: "",
    },
    role: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "role",
        enum: ["admin", "manager"],
        required: true,
    },
    generalId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "general",
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("users", UserSchema);
