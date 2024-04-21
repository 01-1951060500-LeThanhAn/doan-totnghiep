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

router.get(`/`, verifyTokenAndAuthorization, getShippets);

router.delete("/:id", verifyTokenAndAdmin, deleteShippets);

router.patch("/:id", verifyTokenAndAuthorization, updateShippets);

router.get("/:id", verifyTokenAndAuthorization, getDetailShippets);
export default router;
