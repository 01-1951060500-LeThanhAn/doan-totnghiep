import express from "express";
import {
  getListUser,
  loginUser,
  registerUser,
} from "../controller/userController";
import { verifyTokenAndAdmin } from "../middleware/auth";
const router = express.Router();

router.post(`/login`, loginUser);

router.post(`/register`, registerUser);

router.get(`/listuser`, verifyTokenAndAdmin, getListUser);
export default router;
