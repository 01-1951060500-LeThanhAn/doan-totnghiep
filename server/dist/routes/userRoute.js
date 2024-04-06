"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const middleware_1 = require("../middleware");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post(`/`, middleware_1.jwtCheck, UserController_1.createUser);
router.get(`/`, middleware_1.jwtCheck, middleware_1.parseJwt, UserController_1.getUser);
router.patch(`/`, middleware_1.jwtCheck, middleware_1.parseJwt, validation_1.validateUserRequest, UserController_1.updateUser);
exports.default = router;
