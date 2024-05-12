import express from "express";
import { verifyTokenAndAuthorization } from "../middleware/auth";
import {
  createReturnOrder,
  getReturnOrder,
} from "../controller/returnOrderController";

const router = express.Router();

router.post(`/`, verifyTokenAndAuthorization, createReturnOrder);

router.get(`/`, verifyTokenAndAuthorization, getReturnOrder);

export default router;
