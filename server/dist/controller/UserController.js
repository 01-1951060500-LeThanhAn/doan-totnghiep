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
exports.getUser = exports.updateUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body;
        const existUser = yield user_1.default.findOne({ auth0Id });
        if (existUser) {
            return res.status(200).json("User created before");
        }
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        res.status(201).json({
            message: "Create user successfully",
            newUser: newUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, country, city } = req.body;
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.address = address;
        user.city = city;
        user.country = country;
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating user",
        });
    }
});
exports.updateUser = updateUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findOne({
            _id: req.userId,
        });
        if (!currentUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            currentUser,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating user",
        });
    }
});
exports.getUser = getUser;
