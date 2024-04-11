import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createProduct,
  deleteProduct,
  getDetailProduct,
  getListProducts,
  searchProduct,
  updateProduct,
} from "../controller/productController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createProduct);

router.get(`/`, getListProducts);

router.get(`/:id`, getDetailProduct);

router.patch(`/:id`, verifyTokenAndAdmin, updateProduct);

router.delete(`/:id`, verifyTokenAndAdmin, deleteProduct);

router.get(`/search`, searchProduct);

export default router;
