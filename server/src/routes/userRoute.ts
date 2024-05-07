import express from "express";
import {
  deleteUser,
  getAllUsers,
  getInfoUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controller/userController";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import checkLogin from "../middleware/checkLogin";
const router = express.Router();

router.post(`/login`, loginUser);

router.post(`/`, verifyTokenAndAdmin, registerUser);

router.get(`/`, verifyTokenAndAdmin, getAllUsers);

router.get(`/info-user`, checkLogin, verifyTokenAndAuthorization, getInfoUser);

router.patch(`/:id`, verifyTokenAndAuthorization, updateUser);

router.delete(`/:id`, verifyTokenAndAdmin, deleteUser);

export default router;
