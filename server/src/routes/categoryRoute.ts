import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createCategoryProduct,
  deleteCategoryProduct,
  getCategoryProduct,
} from "../controller/categoryController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createCategoryProduct);

router.get(`/`, verifyTokenAndAdmin, getCategoryProduct);

router.delete(`/:id`, verifyTokenAndAdmin, deleteCategoryProduct);

export default router;
