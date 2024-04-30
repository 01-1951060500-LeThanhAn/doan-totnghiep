import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createImportOrder,
  getAllOrderImport,
  getDetailImportOrder,
  updateImportOrder,
  deleteImportOrder,
} from "../controller/orderImportController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createImportOrder);

router.get(`/`, verifyTokenAndAdmin, getAllOrderImport);

router.patch(`/:id`, verifyTokenAndAdmin, updateImportOrder);

router.get(`/:id`, verifyTokenAndAdmin, getDetailImportOrder);

router.delete(`/:id`, verifyTokenAndAdmin, deleteImportOrder);

export default router;
