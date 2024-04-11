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

          totalSpending: {
            $sum: "$orders.total_price",
          },
          username: {
            $first: "$username",
          },
          email: {
            $first: "$email",
          },
          code: {
            $first: "$code",
          },
          phone: {
            $first: "$phone",
          },
          type: {
            $first: "$type",
          },
          level: {
            $first: "$level",
          },
        },
      },
      {
        $project: {
          _id: 1,
          customerId: 1,
          totalSpending: 1,
          username: 1,
          email: 1,
          code: 1,
          type: 1,
          phone: 1,
          level: 1,
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
        $unwind: "$orders",
      },
      {
        $group: {
          _id: "$_id",

          totalSpending: {
            $sum: "$orders.total_price",
          },
          customerId: {
            $first: "$customerId",
          },
        },
      },
      {
        $project: {
          _id: 0,
          customerId: "$_id",
          totalSpending: 1,
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
export { createCustomer, getListCustomer, getInfoCustomer, deleteCustomer };
