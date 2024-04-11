import { Request, Response } from "express";
import CustomerModel from "../model/CustomerModel";
import mongoose from "mongoose";

const createCustomer = async (req: Request, res: Response) => {
  const customer = new CustomerModel({
    ...req.body,
  });

  try {
    await customer.save();
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getListCustomer = async (req: Request, res: Response) => {
  try {
    const customers = await CustomerModel.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders",
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $group: {
          _id: "$_id",
          customerData: { $first: "$$ROOT" },
          totalSpending: { $sum: "$orders.total_price" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          customer: "$customerData",
          totalSpending: 1,
          totalOrders: 1,
        },
      },
    ]);

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers with total spending:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getInfoCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;

    if (!customerId) {
      return res.status(400).json({ message: "Customer not found" });
    }

    const customer = await CustomerModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(customerId),
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders",
        },
      },
      {
        $project: {
          _id: 1,
          customerId: 1,
          orders: {
            _id: 1,
            products: 1,
            total_price: 1,
            payment_status: 1,
            received_date: 1,
            order_status: 1,
          },
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $group: {
          _id: "$_id",
          totalSpending: {
            $sum: "$orders.total_price",
          },
          totalOrders: {
            $sum: 1,
          },
          customerId: {
            $first: "$customerId",
          },
          orders: {
            $push: "$orders",
          },
        },
      },
      {
        $project: {
          _id: 0,

          totalSpending: 1,
          totalOrders: 1,
          orders: 1,
        },
      },
    ]);

    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching total spending:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;

    const customer = await CustomerModel.findByIdAndDelete(customerId);

    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer has been deleted",
    });
  } catch (error) {}
};

const getHistoryOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;

    if (!customerId) {
      return res.status(400).json({ message: "Customer not found" });
    }

    const customer = await CustomerModel.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customerId",
          as: "orders",
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $sort: {
          "orders.createdAt": -1,
        },
      },
      {
        $project: {
          _id: 0,
          orders: {
            _id: 1,
            products: 1,
            total_price: 1,
            payment_status: 1,
            received_date: 1,
            order_status: 1,
          },
        },
      },
    ]);

    if (!customer.length) {
      return res
        .status(404)
        .json({ message: "Customer does not have any orders" });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer with orders:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export {
  createCustomer,
  getListCustomer,
  getInfoCustomer,
  deleteCustomer,
  getHistoryOrder,
};
