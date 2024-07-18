"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
const checkLogin_1 = __importDefault(require("../middleware/checkLogin"));
const router = express_1.default.Router();
router.post(`/login`, userController_1.loginUser);
router.post(`/`, auth_1.verifyTokenAndAdmin, userController_1.registerUser);
router.get(`/`, auth_1.verifyTokenAndAuthorization, userController_1.getAllUsers);
router.get(`/:id`, checkLogin_1.default, auth_1.verifyTokenAndAuthorization, userController_1.getInfoUser);
router.get(`/info/detail-user`, checkLogin_1.default, userController_1.getDetailUser);
router.patch(`/:id`, auth_1.verifyTokenAndAuthorization, userController_1.updateUser);
router.delete(`/:id`, auth_1.verifyTokenAndAdmin, userController_1.deleteUser);
exports.default = router;
