import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import {
  createSupplier,
  deleteSupplier,
  getDetailSupplier,
  getListSuppliers,
  updateSupplier,
} from "../controller/supplierController";

const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createSupplier);

router.get(`/`, verifyTokenAndAuthorization, getListSuppliers);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailSupplier);

router.patch(`/:id`, verifyTokenAndAuthorization, updateSupplier);

router.delete(`/:id`, verifyTokenAndAdmin, deleteSupplier);

export default router;
