import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import {
  createGeneralDepot,
  getDetailGeneralDepot,
  getGeneralDepot,
} from "../controller/generalDepotController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createGeneralDepot);

router.get(`/`, verifyTokenAndAdmin, getGeneralDepot);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailGeneralDepot);
export default router;
