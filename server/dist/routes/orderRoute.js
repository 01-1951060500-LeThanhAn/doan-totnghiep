"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controller/orderController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAdmin, orderController_1.createOrder);
router.get(`/`, auth_1.verifyTokenAndAdmin, orderController_1.getAllOrder);
router.get(`/:id`, orderController_1.getDetailOrder);
router.patch(`/:id`, auth_1.verifyTokenAndAuthorization, orderController_1.updateOrder);
router.delete("/:id", auth_1.verifyTokenAndAuthorization, orderController_1.deleteOrder);
router.get("/income/total-orders", auth_1.verifyTokenAndAdmin, orderController_1.getIncomeOrders);
router.get("/search/category-orders", orderController_1.searchOrder);
exports.default = router;
