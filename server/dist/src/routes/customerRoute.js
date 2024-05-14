"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const customerController_1 = require("../controller/customerController");
const router = express_1.default.Router();
router.post("/", auth_1.verifyTokenAndAuthorization, customerController_1.createCustomer);
router.get(`/`, auth_1.verifyTokenAndAuthorization, customerController_1.getListCustomer);
router.get("/:id", auth_1.verifyTokenAndAuthorization, customerController_1.getInfoCustomer);
router.patch("/:id", auth_1.verifyTokenAndAuthorization, customerController_1.updateCustomer);
router.delete("/:id", auth_1.verifyTokenAndAuthorization, customerController_1.deleteCustomer);
router.get("/history/:id", auth_1.verifyTokenAndAuthorization, customerController_1.getHistoryOrder);
router.get("/income/total-customer", auth_1.verifyTokenAndAdmin, customerController_1.getTotalCustomer);
exports.default = router;
