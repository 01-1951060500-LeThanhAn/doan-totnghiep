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
exports.deleteGeneralDepot = exports.updateGeneralDepot = exports.getDetailGeneralDepot = exports.getGeneralDepot = exports.createGeneralDepot = void 0;
const GeneralDepotModel_1 = __importDefault(require("../model/GeneralDepotModel"));
const mongoose_1 = __importDefault(require("mongoose"));
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
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { user } = req.user;
        console.log(user.role);
        if (!user || !(user === null || user === void 0 ? void 0 : user.role)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        let query = {};
        if ((user === null || user === void 0 ? void 0 : user.role) === "admin") {
            query = {};
        }
        else if ((user === null || user === void 0 ? void 0 : user.role) === "manager") {
            query = { manager: user._id };
        }
        const generals = yield GeneralDepotModel_1.default.find(query).populate("manager");
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
        const results = yield GeneralDepotModel_1.default.findById(generalId);
        const general = yield GeneralDepotModel_1.default.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(generalId),
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "generalId",
                    as: "products",
                },
            },
            {
                $project: {
                    _id: 1,
                    products: {
                        _id: 1,
                        generalId: 1,
                        code: 1,
                        name_product: 1,
                        import_price: 1,
                        export_price: 1,
                        inventory_number: 1,
                        pendingOrderQuantity: 1,
                        pendingWarehouseQuantity: 1,
                        status: 1,
                        img: 1,
                        type: 1,
                        unit: 1,
                        desc: 1,
                    },
                },
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$_id",
                    type: {
                        $first: "$products.type",
                    },
                    products: {
                        $push: "$products",
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    products: 1,
                },
            },
        ]);
        return res.status(200).json({
            results,
            general,
        });
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
const deleteGeneralDepot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const generalId = req.params.id;
    if (!generalId) {
        return res.status(400).json({ message: "General not found" });
    }
    try {
        const deletedGeneral = yield GeneralDepotModel_1.default.findByIdAndDelete(generalId);
        if (!deletedGeneral) {
            return res.status(400).json({ message: "General not found" });
        }
        return res.status(200).json("General deleted");
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.deleteGeneralDepot = deleteGeneralDepot;
