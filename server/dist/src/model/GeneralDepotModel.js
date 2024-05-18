"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const generalDepotSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ["main", "sub"],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    manager: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    },
}, {
    timestamps: true,
});
// generalDepotSchema.virtual("ProductSchema", {
//   ref: "products",
//   localField: "products",
//   foreignField: "_id",
//   justOne: true,
// });
// generalDepotSchema.virtual("ShippingWarehouseModel", {
//   ref: "shipping_warehouse",
//   localField: "products",
//   foreignField: "generalId",
//   justOne: true,
// });
exports.default = mongoose_1.default.model("general", generalDepotSchema);
