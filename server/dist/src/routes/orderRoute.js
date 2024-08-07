"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controller/orderController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAuthorization, orderController_1.createOrder);
router.get(`/`, auth_1.verifyTokenAndAuthorization, orderController_1.getAllOrder);
router.get(`/:id`, auth_1.verifyTokenAndAuthorization, orderController_1.getDetailOrder);
router.patch(`/:id`, auth_1.verifyTokenAndAuthorization, orderController_1.updateOrder);
router.delete("/:id", auth_1.verifyTokenAndAuthorization, orderController_1.deleteOrder);
router.get("/income/revenue-orders-day", auth_1.verifyTokenAndAdmin, orderController_1.getIncomeOrders);
router.get("/income/revenue-orders-month", auth_1.verifyTokenAndAuthorization, orderController_1.getRevenueOrdersMonth);
router.get("/income/revenue-orders-general", auth_1.verifyTokenAndAuthorization, orderController_1.getRevenueOrdersGeneral);
router.get("/income/revenue-orders-staff", auth_1.verifyTokenAndAuthorization, orderController_1.getRevenueOrdersStaff);
router.get("/income/revenue-orders-product", auth_1.verifyTokenAndAuthorization, orderController_1.getRevenueOrdersProducts);
router.get("/income/revenue-orders-customer", auth_1.verifyTokenAndAuthorization, orderController_1.getRevenueOrdersCustomer);
router.get("/income/revenue-orders-customer-group", auth_1.verifyTokenAndAuthorization, orderController_1.getRevenueOrdersCustomerGroup);
router.get("/income/shipments-orders-time", auth_1.verifyTokenAndAuthorization, orderController_1.getShipmentOrdersTime);
router.get("/income/shipments-orders-staff", auth_1.verifyTokenAndAuthorization, orderController_1.getShipmentOrdersStaff);
router.get("/income/shipments-orders-partner", auth_1.verifyTokenAndAuthorization, orderController_1.getShipmentOrderPartner);
router.get("/income/shipments-orders-general", auth_1.verifyTokenAndAuthorization, orderController_1.getShipmentOrderGeneral);
router.get("/income/payments-orders-time", auth_1.verifyTokenAndAuthorization, orderController_1.getPaymentOrderTime);
router.get("/income/payments-orders-staff", auth_1.verifyTokenAndAuthorization, orderController_1.getPaymentOrderStaff);
router.get("/income/total-orders-general", auth_1.verifyTokenAndAuthorization, orderController_1.getIncomeOrdersGeneral);
router.get("/income/total-orders-area", auth_1.verifyTokenAndAuthorization, orderController_1.getIncomeOrdersArea);
router.get("/income/total-orders-product", auth_1.verifyTokenAndAuthorization, orderController_1.getIncomeOrdersProduct);
router.get("/income/total-orders-customer-group", auth_1.verifyTokenAndAuthorization, orderController_1.getIncomeOrdersCustomerGroup);
router.get("/search/status-orders", auth_1.verifyTokenAndAuthorization, orderController_1.searchOrder);
router.get("/search/date-orders", auth_1.verifyTokenAndAuthorization, orderController_1.searchDateOrders);
exports.default = router;
