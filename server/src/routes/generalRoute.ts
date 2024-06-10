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
  deleteGeneralDepot,
} from "../controller/generalDepotController";
const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createGeneralDepot);

router.get(`/`, verifyTokenAndAuthorization, getGeneralDepot);

router.get(`/:id`, verifyTokenAndAuthorization, getDetailGeneralDepot);

router.patch(`/:id`, verifyTokenAndAuthorization, updateGeneralDepot);

router.delete(`/:id`, verifyTokenAndAdmin, deleteGeneralDepot);
export default router;
