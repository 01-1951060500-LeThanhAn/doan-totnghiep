"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const returnOrderController_1 = require("../controller/returnOrderController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAuthorization, returnOrderController_1.createReturnOrder);
router.get(`/`, auth_1.verifyTokenAndAuthorization, returnOrderController_1.getReturnOrder);
router.get(`/:id`, auth_1.verifyTokenAndAuthorization, returnOrderController_1.getDetailReturnOrder);
router.patch("/:id", auth_1.verifyTokenAndAuthorization, returnOrderController_1.updateReturnOrders);
router.delete(`/:id`, auth_1.verifyTokenAndAuthorization, returnOrderController_1.deleteReturnOrder);
router.get("/income/return-order-product", auth_1.verifyTokenAndAuthorization, returnOrderController_1.getIncomeReturnOrderByProduct);
exports.default = router;
