import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import {
  createGeneralDepot,
  getDetailGeneralDepot,
  getGeneralDepot,
  updateGeneralDepot,
} from "../controller/generalDepotController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createGeneralDepot);

router.get(`/`, verifyTokenAndAuthorization, getGeneralDepot);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailGeneralDepot);

router.patch(`/:id`, verifyTokenAndAuthorization, updateGeneralDepot);

export default router;
