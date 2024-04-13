"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function checkLogin(req, res, next) {
    var _a, _b;
    if ((req === null || req === void 0 ? void 0 : req.url.toLowerCase().trim()) == "/users/login".toLowerCase().trim()) {
        next();
    }
    const token = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) && ((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization.split(" ")[1]);
    if (!token) {
        return res.status(401).json("Invalid authorization format. Missing token");
    }
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json("Token is valid");
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        console.log("Token is failed");
    }
}
exports.default = checkLogin;
