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
exports.getRoles = exports.createRoles = void 0;
const RoleModel_1 = __importDefault(require("../model/RoleModel"));
const createRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, permissions } = req.body;
        const existingRole = yield RoleModel_1.default.findOne({ name });
        if (existingRole) {
            throw new Error(`Role with name "${req.body.name}" already exists.`);
        }
        const role = new RoleModel_1.default({ name, permissions });
        yield role.save();
        res.status(200).json(role);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.createRoles = createRoles;
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield RoleModel_1.default.find();
        res.status(200).json(roles);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
});
exports.getRoles = getRoles;
