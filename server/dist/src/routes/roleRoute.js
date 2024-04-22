"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controller/roleController");
const router = express_1.default.Router();
router.post("/", roleController_1.createRoles);
router.get("/", roleController_1.getRoles);
exports.default = router;
