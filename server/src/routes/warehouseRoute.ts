import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import {
  createWareHouse,
  deleteWarehouse,
  getIncomeWarehouse,
  getWareHouse,
  getWareHouseByProduct,
  getWareHouseBySupplier,
  getInfoWareHouse,
  updateWarehouse,
  searchWarehouseOrder,
  getWareHouseByGeneral,
  getWareHouseByOrders,
  getWareHouseByManager,
  getPaymentWarehouseStaff,
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

router.get(
  `/income/total-warehouse-manager`,
  verifyTokenAndAdmin,
  getWareHouseByManager
);

router.get(
  `/income/total-warehouse-orders`,
  verifyTokenAndAdmin,
  getWareHouseByOrders
);

router.get(
  `/income/payments-warehouse-staff`,
  verifyTokenAndAdmin,
  getPaymentWarehouseStaff
);

router.get(`/income/total-warehouse`, verifyTokenAndAdmin, getIncomeWarehouse);

router.get(
  "/search/status-warehouse-orders",
  verifyTokenAndAuthorization,
  searchWarehouseOrder
);

export default router;
