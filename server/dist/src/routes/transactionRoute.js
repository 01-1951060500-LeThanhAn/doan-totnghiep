"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const transactionController_1 = require("../controller/transactionController");
const router = express_1.default.Router();
router.get("/", auth_1.verifyTokenAndAuthorization, transactionController_1.getAllTransactions);
router.get("/:id", auth_1.verifyTokenAndAdmin, transactionController_1.getDetailTransaction);
router.delete("/:id", auth_1.verifyTokenAndAdmin, transactionController_1.deleteTransaction);
exports.default = router;
