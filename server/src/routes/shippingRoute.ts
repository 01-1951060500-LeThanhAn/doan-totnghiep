import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createShippets,
  getShippets,
  deleteShippets,
  updateShippets,
} from "../controller/shippingController";

const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createShippets);

router.get(`/`, verifyTokenAndAdmin, getShippets);

router.delete("/:id", verifyTokenAndAdmin, deleteShippets);

router.patch("/:id", verifyTokenAndAdmin, updateShippets);

export default router;
