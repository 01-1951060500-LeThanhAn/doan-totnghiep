import express from "express";
import { verifyTokenAndAuthorization } from "../middleware/auth";
import {
  createReturnOrder,
  getReturnOrder,
  getDetailReturnOrder,
} from "../controller/returnOrderController";

const router = express.Router();

router.post(`/`, verifyTokenAndAuthorization, createReturnOrder);

router.get(`/`, verifyTokenAndAuthorization, getReturnOrder);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailReturnOrder);

export default router;
