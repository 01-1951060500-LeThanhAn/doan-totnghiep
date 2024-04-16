import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createWareHouse,
  deleteWarehouse,
  getIncomeWarehouse,
  getWareHouse,
  getWareHouseByProduct,
  getWareHouseBySupplier,
  getWareHouseByGeneral,
} from "../controller/wareHouseController";

const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createWareHouse);

router.get(`/`, verifyTokenAndAdmin, getWareHouse);

router.delete(`/:id`, verifyTokenAndAdmin, deleteWarehouse);

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
