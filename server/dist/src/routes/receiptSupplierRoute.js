"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const receiptWarehouseController_1 = require("../controller/receiptWarehouseController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAuthorization, receiptWarehouseController_1.createReceiptSupplier);
router.get(`/`, auth_1.verifyTokenAndAuthorization, receiptWarehouseController_1.getReceiptSupplier);
router.delete("/:id", auth_1.verifyTokenAndAuthorization, receiptWarehouseController_1.deleteReceiptSupplier);
router.get("/:id", auth_1.verifyTokenAndAuthorization, receiptWarehouseController_1.getInfoReceiptSupplier);
exports.default = router;
