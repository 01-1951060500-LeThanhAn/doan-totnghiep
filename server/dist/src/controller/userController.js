"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getInfoUser = exports.getAllUsers = exports.registerUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const UserModel_1 = __importDefault(require("../model/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user === null || user === void 0 ? void 0 : user.password);
        if (!validPassword) {
            res.status(400).json("wrong password");
        }
        else {
            const accessToken = jsonwebtoken_1.default.sign({
                userId: user === null || user === void 0 ? void 0 : user._id,
                isAdmin: user === null || user === void 0 ? void 0 : user.isAdmin,
                username: user === null || user === void 0 ? void 0 : user.username,
            }, process.env.JWT_SECRET, { expiresIn: "3h" });
            res.status(200).json({
                user: user,
                token: accessToken,
                success: true,
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPw = yield bcrypt_1.default.hash(req.body.password, salt);
        const hashedConfirmPw = yield bcrypt_1.default.hash(req.body.confirmPassword, salt);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                error: "Mật khẩu xác nhận không khớp",
            });
        }
        const user = new UserModel_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hashedPw,
            confirmPassword: hashedConfirmPw,
        });
        const accessToken = jsonwebtoken_1.default.sign({
            userId: user._id,
            isAdmin: user.isAdmin,
            username: user.username,
        }, process.env.JWT_SECRET, { expiresIn: "3h" });
        const savedUser = yield user.save();
        res.status(201).json({
            results: savedUser,
            success: true,
            token: accessToken,
        });
    }
    catch (error) {
        res.status(500).json({
            error,
            msg: "Đăng ký thất bại",
        });
    }
});
exports.registerUser = registerUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listusers = yield UserModel_1.default.find().select("-passwword -confirmPassword");
        return res.status(200).json(listusers);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to get list user",
        });
    }
});
exports.getAllUsers = getAllUsers;
const getInfoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        const userInfo = yield UserModel_1.default.findById(userId).select("-password -confirmPassword");
        if (userInfo) {
            return res.status(200).json({
                success: true,
                user: userInfo,
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server not found!",
        });
    }
});
exports.getInfoUser = getInfoUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                error: "UserId not found",
            });
        }
        const updatedUser = yield UserModel_1.default.findByIdAndUpdate(userId, {
            $set: req.body,
        }, { new: true });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ msg: "Update failed" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const deletedUser = yield UserModel_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(401).json({
                message: "Mã người dùng không hợp lệ hoặc không tồn tại",
            });
        }
        res.status(200).json({
            message: "Xóa người dùng thành công",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Lỗi khi xóa danh mục sản phẩm",
        });
    }
});
exports.deleteUser = deleteUser;
