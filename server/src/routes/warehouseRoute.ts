import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth";
import {
  createWareHouse,
  deleteWarehouse,
  getWareHouse,
} from "../controller/wareHouseController";

const router = express.Router();

router.post(`/`, verifyTokenAndAdmin, createWareHouse);

router.get(`/`, verifyTokenAndAdmin, getWareHouse);

router.delete(`/:id`, verifyTokenAndAdmin, deleteWarehouse);

export default router;
