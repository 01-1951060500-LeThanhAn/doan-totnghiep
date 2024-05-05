"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const shippingController_1 = require("../controller/shippingController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAdmin, shippingController_1.createShippets);
router.get(`/`, auth_1.verifyTokenAndAdmin, shippingController_1.getShippets);
router.delete("/:id", auth_1.verifyTokenAndAdmin, shippingController_1.deleteShippets);
router.patch("/:id", auth_1.verifyTokenAndAdmin, shippingController_1.updateShippets);
router.get("/:id", auth_1.verifyTokenAndAdmin, shippingController_1.getDetailShippets);
exports.default = router;
