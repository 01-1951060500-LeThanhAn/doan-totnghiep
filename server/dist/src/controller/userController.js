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
    var _a, _b;
    try {
        const user = yield UserModel_1.default.findOne({ email: req.body.email }).populate("role");
        if (!user) {
            return res.status(403).json({ message: "Invalid user not found	" });
        }
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(403).json({ message: "Invalid password	" });
        }
        const token = generateAccessToken({
            user,
            role: (_a = user.role) === null || _a === void 0 ? void 0 : _a.name,
        });
        res.status(200).json({
            user,
            role: (_b = user.role) === null || _b === void 0 ? void 0 : _b.name,
            token: token,
            success: true,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Login failed" });
        throw new Error("Login failed");
    }
});
exports.loginUser = loginUser;
function generateAccessToken(userData) {
    const accessToken = jsonwebtoken_1.default.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "3h",
    });
    return accessToken;
}
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
        // const managerRole = await RoleModel.findById(req.body.role);
        // if (!managerRole) {
        //   return res.status(400).json({ error: "Invalid role ID" });
        // }
        const user = new UserModel_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hashedPw,
            confirmPassword: hashedConfirmPw,
            role: req.body.role,
        });
        const accessToken = jsonwebtoken_1.default.sign({
            userId: user._id,
            role: user.role,
            username: user.username,
        }, process.env.JWT_SECRET, { expiresIn: "3h" });
        const savedUser = yield user.save();
        res.status(201).json({
            results: savedUser,
            role: user === null || user === void 0 ? void 0 : user.role,
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
        const listusers = yield UserModel_1.default.find()
            .select("-password -confirmPassword")
            .populate("role");
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
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = req.user;
        const data = yield UserModel_1.default.findOne({ _id: user._id }).select("-password -confirmPassword");
        if (user) {
            return res.status(200).json({
                success: true,
                results: data,
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
