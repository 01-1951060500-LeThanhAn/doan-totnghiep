import express from "express";
import { createRoles, getRoles } from "../controller/roleController";
import { verifyTokenAndAdmin } from "../middleware/auth";
const router = express.Router();

router.post("/", verifyTokenAndAdmin, createRoles);

router.get("/", verifyTokenAndAdmin, getRoles);

export default router;
