import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createImportOrder,
  getAllOrderImport,
  getDetailImportOrder,
  updateImportOrder,
} from "../controller/orderImportController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createImportOrder);

router.get(`/`, verifyTokenAndAdmin, getAllOrderImport);

router.patch(`/:id`, verifyTokenAndAdmin, updateImportOrder);

router.get(`/:id`, verifyTokenAndAdmin, getDetailImportOrder);

export default router;
