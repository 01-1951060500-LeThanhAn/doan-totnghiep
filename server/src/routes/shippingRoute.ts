import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import {
  createShippets,
  getShippets,
  deleteShippets,
  updateShippets,
  getDetailShippets,
} from "../controller/shippingController";

const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createShippets);

router.get(`/`, verifyTokenAndAdmin, getShippets);

router.delete("/:id", verifyTokenAndAdmin, deleteShippets);

router.patch("/:id", verifyTokenAndAdmin, updateShippets);

router.get("/:id", verifyTokenAndAdmin, getDetailShippets);
export default router;
