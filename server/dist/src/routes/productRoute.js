"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const productController_1 = require("../controller/productController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAdmin, productController_1.createProduct);
router.get(`/`, auth_1.verifyTokenAndAuthorization, productController_1.getListProducts);
router.get(`/type`, auth_1.verifyTokenAndAuthorization, productController_1.getTypeProducts);
router.get(`/:id`, auth_1.verifyTokenAndAuthorization, productController_1.getDetailProduct);
router.patch(`/:id`, auth_1.verifyTokenAndAdmin, productController_1.updateProduct);
router.delete(`/:id`, auth_1.verifyTokenAndAdmin, productController_1.deleteProduct);
router.get(`/api/search`, auth_1.verifyTokenAndAuthorization, productController_1.searchProduct);
exports.default = router;
