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
} from "../controller/customerController";

const router = express.Router();

router.post("/", verifyTokenAndAuthorization, createCustomer);

router.get(`/`, verifyTokenAndAuthorization, getListCustomer);

router.get("/:id", getInfoCustomer);

router.delete("/:id", deleteCustomer);

router.get("/history/:id", verifyTokenAndAuthorization, getHistoryOrder);

router.get(
  "/income/total-customer",
  verifyTokenAndAuthorization,
  getTotalCustomer
);

export default router;
