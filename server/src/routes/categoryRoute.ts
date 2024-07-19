import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import {
  createCategoryProduct,
  deleteCategoryProduct,
  getCategoryProduct,
  getDetailCategoryProduct,
  updateCategoryProduct,
} from "../controller/categoryController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createCategoryProduct);

router.get(`/`, verifyTokenAndAuthorization, getCategoryProduct);

router.delete(`/:id`, verifyTokenAndAdmin, deleteCategoryProduct);

router.patch(`/:id`, verifyTokenAndAdmin, updateCategoryProduct);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailCategoryProduct);

export default router;
