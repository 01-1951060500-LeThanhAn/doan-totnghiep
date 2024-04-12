import express from "express";
import {
  createPartner,
  deletePartner,
  getInfoPartner,
  getPartners,
} from "../controller/partnerController";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createPartner);

router.get("/", verifyTokenAndAdmin, getPartners);

router.get("/:id", verifyTokenAndAuthorization, getInfoPartner);

router.delete("/:id", verifyTokenAndAdmin, deletePartner);

export default router;
