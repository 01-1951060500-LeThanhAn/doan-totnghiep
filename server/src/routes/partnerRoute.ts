import express from "express";
import {
  createPartner,
  deletePartner,
  getInfoPartner,
  updatePartner,
  getPartners,
  searchPartner,
} from "../controller/partnerController";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createPartner);

router.get("/", verifyTokenAndAuthorization, getPartners);

router.get("/:id", verifyTokenAndAuthorization, getInfoPartner);

router.delete("/:id", verifyTokenAndAdmin, deletePartner);

router.patch("/:id", verifyTokenAndAdmin, updatePartner);

router.get(
  "/search/status-partner",
  verifyTokenAndAuthorization,
  searchPartner
);

export default router;
