"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    permissions: {
        type: Array,
        required: true,
        default: [],
    },
});
exports.default = mongoose.model("role", RoleSchema);
