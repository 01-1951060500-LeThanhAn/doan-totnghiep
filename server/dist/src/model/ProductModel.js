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
const ProductSchema = new mongoose_1.default.Schema({
    name_product: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    generalId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "general",
    },
    manager: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
    },
    type: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "category",
    },
    unit: {
        type: String,
        required: true,
    },
    import_price: {
        type: Number,
        required: true,
    },
    export_price: {
        type: Number,
        required: true,
    },
    inventory_number: {
        type: Number,
        required: true,
        default: 0,
    },
    pendingOrderQuantity: {
        required: true,
        type: Number,
        default: 0,
    },
    pendingWarehouseQuantity: {
        required: true,
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        required: true,
        enum: ["stocking", "out-of-stock"],
        default: "stocking",
    },
    img: {
        type: String,
    },
    desc: {
        type: String,
    },
    transactionHistory: {
        type: [
            {
                orderId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "orders",
                },
                generalId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "generals",
                },
                staffId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "users",
                },
                productId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "products",
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                inventory_number: {
                    type: Number,
                    required: true,
                },
                transactionType: {
                    type: String,
                    enum: ["order", "adjustment"],
                    default: "order",
                },
                transactionDate: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        default: [],
    },
    stockAdjustmentHistory: {
        type: [
            {
                stockAjustmentId: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "stock_adjustment",
                },
            },
        ],
        default: [],
    },
}, {
    timestamps: true,
});
ProductSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "type",
            select: "name code",
        });
        next();
    });
});
ProductSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "manager",
            select: "username email phone address picture role",
        });
        next();
    });
});
ProductSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.populate({
            path: "generalId",
            select: "name type phone address manager",
        });
        next();
    });
});
exports.default = mongoose_1.default.model("products", ProductSchema);
