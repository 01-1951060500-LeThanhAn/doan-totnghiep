"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const orderImportController_1 = require("../controller/orderImportController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAdmin, orderImportController_1.createImportOrder);
router.get(`/`, auth_1.verifyTokenAndAdmin, orderImportController_1.getAllOrderImport);
router.patch(`/:id`, auth_1.verifyTokenAndAdmin, orderImportController_1.updateImportOrder);
router.get(`/:id`, auth_1.verifyTokenAndAdmin, orderImportController_1.getDetailImportOrder);
router.delete(`/:id`, auth_1.verifyTokenAndAdmin, orderImportController_1.deleteImportOrder);
exports.default = router;
