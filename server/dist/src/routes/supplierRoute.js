"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const supplierController_1 = require("../controller/supplierController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAdmin, supplierController_1.createSupplier);
router.get(`/`, auth_1.verifyTokenAndAdmin, supplierController_1.getListSuppliers);
router.get(`/:id`, auth_1.verifyTokenAndAdmin, supplierController_1.getDetailSupplier);
router.patch(`/:id`, auth_1.verifyTokenAndAdmin, supplierController_1.updateSupplier);
router.delete(`/:id`, auth_1.verifyTokenAndAdmin, supplierController_1.deleteSupplier);
exports.default = router;
