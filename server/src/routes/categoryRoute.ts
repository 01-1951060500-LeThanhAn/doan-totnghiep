import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createCategoryProduct,
  deleteCategoryProduct,
  getCategoryProduct,
  getDetailCategoryProduct,
  updateCategoryProduct,
} from "../controller/categoryController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createCategoryProduct);

router.get(`/`, verifyTokenAndAdmin, getCategoryProduct);

router.delete(`/:id`, verifyTokenAndAdmin, deleteCategoryProduct);

router.patch(`/:id`, verifyTokenAndAdmin, updateCategoryProduct);

router.get(`/:id`, verifyTokenAndAdmin, getDetailCategoryProduct);

export default router;
