"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const receiptOrderController_1 = require("../controller/receiptOrderController");
const router = express_1.default.Router();
router.post("/", auth_1.verifyTokenAndAuthorization, receiptOrderController_1.createReceipt);
router.get("/", auth_1.verifyTokenAndAuthorization, receiptOrderController_1.getReceipt);
router.delete("/:id", auth_1.verifyTokenAndAuthorization, receiptOrderController_1.deleteReceipt);
router.get("/:id", auth_1.verifyTokenAndAuthorization, receiptOrderController_1.getInfoReceipt);
exports.default = router;
