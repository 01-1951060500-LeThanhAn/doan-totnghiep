import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
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

router.get(`/`, verifyTokenAndAuthorization, getListProducts);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailProduct);

router.patch(`/:id`, verifyTokenAndAdmin, updateProduct);

router.delete(`/:id`, verifyTokenAndAdmin, deleteProduct);

router.get(`/search`, searchProduct);

export default router;
