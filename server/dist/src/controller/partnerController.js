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
exports.updatePartner = exports.deletePartner = exports.getInfoPartner = exports.getPartners = exports.createPartner = void 0;
const PartnerModel_1 = __importDefault(require("../model/PartnerModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createPartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const partner = new PartnerModel_1.default(Object.assign({}, req.body));
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
        const results = yield PartnerModel_1.default.findById(partnerId).populate({
            path: "staffIncharge",
            select: "username email",
        });
        if (!results) {
            return res.status(400).json({
                message: "Partner not found",
            });
        }
        const partner = yield PartnerModel_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(partnerId),
                },
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "partnerId",
                    as: "orders",
                },
            },
            {
                $project: {
                    _id: 1,
                    partnerId: 1,
                    orders: {
                        _id: 1,
                        products: 1,
                        generalId: 1,
                        total_price: 1,
                        payment_status: 1,
                        code: 1,
                        received_date: 1,
                        order_status: 1,
                    },
                },
            },
            {
                $unwind: "$orders",
            },
            {
                $group: {
                    _id: "$_id",
                    totalSpending: {
                        $sum: "$orders.total_price",
                    },
                    totalOrders: {
                        $sum: 1,
                    },
                    partnerId: {
                        $first: "$partnerId",
                    },
                    orders: {
                        $push: "$orders",
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    totalSpending: 1,
                    totalOrders: 1,
                    orders: 1,
                },
            },
        ]);
        return res.status(200).json({
            results,
            partner,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.getInfoPartner = getInfoPartner;
const updatePartner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partnerId = req.params.id;
    if (!partnerId) {
        return res.status(400).json({
            message: "Bad Request",
        });
    }
    try {
        const partner = yield PartnerModel_1.default.findByIdAndUpdate(partnerId, req.body, {
            new: true,
        });
        if (!partner) {
            return res.status(400).json({
                message: "Partner not found",
            });
        }
        return res.status(200).json({
            message: "Partner updated",
            results: partner,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.updatePartner = updatePartner;
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
