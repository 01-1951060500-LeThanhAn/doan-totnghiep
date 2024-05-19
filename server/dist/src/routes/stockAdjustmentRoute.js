"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const stockAdjustmentController_1 = require("../controller/stockAdjustmentController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAuthorization, stockAdjustmentController_1.createStockAdjustment);
router.get(`/`, auth_1.verifyTokenAndAuthorization, stockAdjustmentController_1.getStockAdjustment);
router.get(`/:id`, auth_1.verifyTokenAndAuthorization, stockAdjustmentController_1.getDetailStockAdjustment);
router.patch(`/:id`, auth_1.verifyTokenAndAuthorization, stockAdjustmentController_1.updateStockAdjustment);
router.delete(`/:id`, auth_1.verifyTokenAndAuthorization, stockAdjustmentController_1.deleteStockAdjustment);
exports.default = router;
