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
const WarehouseSchema = new mongoose_1.default.Schema({
    code: String,
    inventory_number: Number,
    import_price: Number,
    totalPrice: Number,
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "products",
    },
    supplierId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "supplier",
    },
    payment_status: {
        type: String,
        required: true,
        enum: ["delivered", "pending"],
    },
}, {
    timestamps: true,
});
WarehouseSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "productId",
            select: "name_product code import_price img",
        });
        next();
    });
});
exports.default = mongoose_1.default.model("purchase_orders", WarehouseSchema);
