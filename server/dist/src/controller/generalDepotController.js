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
exports.updateGeneralDepot = exports.getDetailGeneralDepot = exports.getGeneralDepot = exports.createGeneralDepot = void 0;
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
const createGeneralDepot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generalDepot = new GeneralDepotModel_1.default(Object.assign({}, req.body));
        yield generalDepot.save();
        res.status(200).json(generalDepot);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.createGeneralDepot = createGeneralDepot;
const getGeneralDepot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = req.user;
        if (!user || !(user === null || user === void 0 ? void 0 : user.role)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let query = {};
        if (((_a = user === null || user === void 0 ? void 0 : user.role) === null || _a === void 0 ? void 0 : _a.name) === "admin") {
            query = {}; // All depots for admins
        }
        else if (((_b = user === null || user === void 0 ? void 0 : user.role) === null || _b === void 0 ? void 0 : _b.name) === "manager") {
            query = { manager: user._id }; // Depots managed by the user
        }
        const generals = yield GeneralDepotModel_1.default.find(query)
            .populate({
            path: "manager",
            select: "-password -confirmPassword",
        })
            .populate({
            path: "products",
            populate: {
                path: "product",
            },
        });
        res.status(200).json(generals);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});
exports.getGeneralDepot = getGeneralDepot;
const getDetailGeneralDepot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generalId = req.params.id;
        if (!generalId) {
            return res.status(400).json({ message: "General not found" });
        }
        const general = yield GeneralDepotModel_1.default.findById(generalId);
        res.status(200).json(general);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.getDetailGeneralDepot = getDetailGeneralDepot;
const updateGeneralDepot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generalId = req.params.id;
        if (!generalId) {
            return res.status(400).json({ message: "General not found" });
        }
        const updatedGeneral = yield GeneralDepotModel_1.default.findByIdAndUpdate(generalId, {
            $set: req.body,
        }, { new: true });
        res.status(200).json("General updated");
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.updateGeneralDepot = updateGeneralDepot;
