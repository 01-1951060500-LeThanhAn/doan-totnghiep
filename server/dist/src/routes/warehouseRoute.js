"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const wareHouseController_1 = require("../controller/wareHouseController");
const router = express_1.default.Router();
router.post(`/`, auth_1.verifyTokenAndAdmin, wareHouseController_1.createWareHouse);
router.get(`/`, auth_1.verifyTokenAndAdmin, wareHouseController_1.getWareHouse);
router.get(`/:id`, auth_1.verifyTokenAndAdmin, wareHouseController_1.getInfoWareHouse);
router.delete(`/:id`, auth_1.verifyTokenAndAdmin, wareHouseController_1.deleteWarehouse);
router.get("/income/total-warehouse-products", auth_1.verifyTokenAndAdmin, wareHouseController_1.getWareHouseByProduct);
router.get(`/income/total-warehouse-supplier`, auth_1.verifyTokenAndAdmin, wareHouseController_1.getWareHouseBySupplier);
router.get(`/income/total-warehouse-general`, auth_1.verifyTokenAndAdmin, wareHouseController_1.getWareHouseByGeneral);
router.get(`/income/total-warehouse`, auth_1.verifyTokenAndAdmin, wareHouseController_1.getIncomeWarehouse);
exports.default = router;
