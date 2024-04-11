import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createSupplier,
  deleteSupplier,
  getDetailSupplier,
  getListSuppliers,
  updateSupplier,
} from "../controller/supplierController";

const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createSupplier);

router.get(`/`, verifyTokenAndAdmin, getListSuppliers);

router.get(`/:id`, verifyTokenAndAdmin, getDetailSupplier);

router.patch(`/:id`, verifyTokenAndAdmin, updateSupplier);

router.delete(`/:id`, verifyTokenAndAdmin, deleteSupplier);

export default router;
