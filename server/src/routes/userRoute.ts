import express from "express";
import {
  deleteUser,
  getAllUsers,
  getInfoUser,
  loginUser,
  registerUser,
  updateUser,
  getDetailUser,
} from "../controller/userController";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import checkLogin from "../middleware/checkLogin";
const router = express.Router();

router.post(`/login`, loginUser);

router.post(`/`, verifyTokenAndAdmin, registerUser);

router.get(`/`, verifyTokenAndAuthorization, getAllUsers);

router.get(`/:id`, checkLogin, verifyTokenAndAuthorization, getInfoUser);

router.get(`/info/detail-user`, checkLogin, getDetailUser);

router.patch(`/:id`, verifyTokenAndAuthorization, updateUser);

router.delete(`/:id`, verifyTokenAndAdmin, deleteUser);

export default router;
