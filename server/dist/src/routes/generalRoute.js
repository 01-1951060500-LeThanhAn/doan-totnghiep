"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const generalDepotController_1 = require("../controller/generalDepotController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAdmin, generalDepotController_1.createGeneralDepot);
router.get(`/`, auth_1.verifyTokenAndAuthorization, generalDepotController_1.getGeneralDepot);
router.get(`/:id`, auth_1.verifyTokenAndAuthorization, generalDepotController_1.getDetailGeneralDepot);
router.patch(`/:id`, auth_1.verifyTokenAndAuthorization, generalDepotController_1.updateGeneralDepot);
router.delete(`/:id`, auth_1.verifyTokenAndAdmin, generalDepotController_1.deleteGeneralDepot);
exports.default = router;
