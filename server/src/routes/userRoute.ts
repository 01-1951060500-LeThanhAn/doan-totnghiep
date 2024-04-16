import express from "express";
import {
  deleteUser,
  getAllUsers,
  getInfoUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controller/userController";
import { verifyTokenAndAdmin } from "../middleware/auth";
import checkLogin from "../middleware/checkLogin";
const router = express.Router();

router.post(`/login`, loginUser);

router.post(`/create-user`, verifyTokenAndAdmin, registerUser);

router.get(`/list-user`, verifyTokenAndAdmin, getAllUsers);

router.get(`/info`, checkLogin, getInfoUser);

router.patch(`/update-user/:id`, updateUser);

router.delete(`/delete-user/:id`, verifyTokenAndAdmin, deleteUser);

export default router;
