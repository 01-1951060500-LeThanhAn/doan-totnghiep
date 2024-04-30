import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createWareHouse,
  deleteWarehouse,
  getIncomeWarehouse,
  getWareHouse,
  getWareHouseByProduct,
  getWareHouseBySupplier,
  getInfoWareHouse,
  updateWarehouse,
  getWareHouseByGeneral,
} from "../controller/wareHouseController";

const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createWareHouse);

router.get(`/`, verifyTokenAndAdmin, getWareHouse);

router.get(`/:id`, verifyTokenAndAdmin, getInfoWareHouse);

router.delete(`/:id`, verifyTokenAndAdmin, deleteWarehouse);

router.patch(`/:id`, verifyTokenAndAdmin, updateWarehouse);

router.get(
  "/income/total-warehouse-products",
  verifyTokenAndAdmin,
  getWareHouseByProduct
);

router.get(
  `/income/total-warehouse-supplier`,
  verifyTokenAndAdmin,
  getWareHouseBySupplier
);

router.get(
  `/income/total-warehouse-general`,
  verifyTokenAndAdmin,
  getWareHouseByGeneral
);

router.get(`/income/total-warehouse`, verifyTokenAndAdmin, getIncomeWarehouse);

export default router;
