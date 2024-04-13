"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const partnerController_1 = require("../controller/partnerController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.verifyTokenAndAdmin, partnerController_1.createPartner);
router.get("/", auth_1.verifyTokenAndAdmin, partnerController_1.getPartners);
router.get("/:id", auth_1.verifyTokenAndAuthorization, partnerController_1.getInfoPartner);
router.delete("/:id", auth_1.verifyTokenAndAdmin, partnerController_1.deletePartner);
exports.default = router;
