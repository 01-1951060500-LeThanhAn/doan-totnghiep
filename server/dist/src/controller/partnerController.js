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
exports.deletePartner = exports.getInfoPartner = exports.getPartners = exports.createPartner = void 0;
const PartnerModel_1 = __importDefault(require("../model/PartnerModel"));
const createPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partner = new PartnerModel_1.default({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
        });
        yield partner.save();
        return res.status(200).json(partner);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.createPartner = createPartner;
const getPartners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partners = yield PartnerModel_1.default.find();
        return res.status(200).json(partners);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.getPartners = getPartners;
const getInfoPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partnerId = req.params.id;
    if (!partnerId) {
        return res.status(400).json({
            message: "Bad Request",
        });
    }
    try {
        const partner = yield PartnerModel_1.default.findById(partnerId);
        if (!partner) {
            return res.status(400).json({
                message: "Partner not found",
            });
        }
        return res.status(200).json(partner);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.getInfoPartner = getInfoPartner;
const deletePartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partnerId = req.params.id;
    if (!partnerId) {
        return res.status(400).json({
            message: "Bad Request",
        });
    }
    try {
        const partner = yield PartnerModel_1.default.findByIdAndDelete(partnerId);
        if (!partner) {
            return res.status(400).json({
                message: "Partner not found",
            });
        }
        return res.status(200).json({
            message: "Partner deleted",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.deletePartner = deletePartner;
