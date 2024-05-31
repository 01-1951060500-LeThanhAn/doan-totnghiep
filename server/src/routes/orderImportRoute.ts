import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createImportOrder,
  getAllOrderImport,
  getDetailImportOrder,
  updateImportOrder,
  deleteImportOrder,
  getIncomePurchaseOrders,
  getIncomePurchaseOrdersProducts,
  getIncomePurchaseOrdersSuppliers,
} from "../controller/orderImportController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createImportOrder);

router.get(`/`, verifyTokenAndAdmin, getAllOrderImport);

router.patch(`/:id`, verifyTokenAndAdmin, updateImportOrder);

router.get(`/:id`, verifyTokenAndAdmin, getDetailImportOrder);

router.delete(`/:id`, verifyTokenAndAdmin, deleteImportOrder);

router.get(
  `/income/total-purchase-orders`,
  verifyTokenAndAdmin,
  getIncomePurchaseOrders
);

router.get(
  `/income/total-purchase-orders-products`,
  verifyTokenAndAdmin,
  getIncomePurchaseOrdersProducts
);

router.get(
  `/income/total-purchase-orders-suppliers`,
  verifyTokenAndAdmin,
  getIncomePurchaseOrdersSuppliers
);

export default router;
