"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const categoryController_1 = require("../controller/categoryController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAdmin, categoryController_1.createCategoryProduct);
router.get(`/`, auth_1.verifyTokenAndAdmin, categoryController_1.getCategoryProduct);
router.delete(`/:id`, auth_1.verifyTokenAndAdmin, categoryController_1.deleteCategoryProduct);
router.patch(`/:id`, auth_1.verifyTokenAndAdmin, categoryController_1.updateCategoryProduct);
router.get(`/:id`, auth_1.verifyTokenAndAdmin, categoryController_1.getDetailCategoryProduct);
exports.default = router;
