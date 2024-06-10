"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAdmin = exports.checkToken = exports.verifyTokenAndAuthorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function checkToken(req, res, next) {
    var _a, _b;
    if (req.url.toLowerCase().trim() === "/users/login".toLowerCase().trim()) {
        return next();
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
        console.error("JWT verification failed:", error);
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json("Invalid JWT token");
        }
        else {
            return res.status(500).json("Internal server error");
        }
    }
}
exports.checkToken = checkToken;
const verifyTokenAndAuthorization = (req, res, next) => {
    checkToken(req, res, () => {
        var _a, _b, _c, _d;
        if (((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.role) === "admin" ||
            ((_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.role) === "manager") {
            next();
        }
        else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
const verifyTokenAndAdmin = (req, res, next) => {
    checkToken(req, res, () => {
        var _a, _b, _c, _d, _e;
        console.log((_a = req.user) === null || _a === void 0 ? void 0 : _a.user.isAdmin);
        if (((_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.role) === "admin" || ((_e = (_d = req.user) === null || _d === void 0 ? void 0 : _d.user) === null || _e === void 0 ? void 0 : _e.isAdmin) === true) {
            next();
        }
        else {
            res.status(403).json("You are not as a admin!");
        }
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
