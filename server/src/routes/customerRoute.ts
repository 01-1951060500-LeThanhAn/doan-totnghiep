import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth";
import {
  createCustomer,
  deleteCustomer,
  getHistoryOrder,
  getInfoCustomer,
  getListCustomer,
  getTotalCustomer,
  updateCustomer,
} from "../controller/customerController";

const router = express.Router();

router.post("/", verifyTokenAndAuthorization, createCustomer);

router.get(`/`, verifyTokenAndAuthorization, getListCustomer);

router.get("/:id", verifyTokenAndAuthorization, getInfoCustomer);

router.patch("/:id", verifyTokenAndAuthorization, updateCustomer);

router.delete("/:id", verifyTokenAndAuthorization, deleteCustomer);

router.get("/history/:id", verifyTokenAndAuthorization, getHistoryOrder);

router.get("/income/total-customer", verifyTokenAndAdmin, getTotalCustomer);

export default router;
