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
  getTypeProducts,
} from "../controller/productController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createProduct);

router.get(`/`, verifyTokenAndAuthorization, getListProducts);

router.get(`/type`, verifyTokenAndAuthorization, getTypeProducts);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailProduct);

router.patch(`/:id`, verifyTokenAndAuthorization, updateProduct);

router.delete(`/:id`, verifyTokenAndAdmin, deleteProduct);

router.get(`/api/search`, verifyTokenAndAuthorization, searchProduct);

export default router;
