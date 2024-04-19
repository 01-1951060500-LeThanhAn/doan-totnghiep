import { Request, Response } from "express";
import GeneralDepotModel from "../model/GeneralDepotModel";
import mongoose from "mongoose";

const createGeneralDepot = async (req: Request, res: Response) => {
  try {
    const generalDepot = new GeneralDepotModel({ ...req.body });

    await generalDepot.save();
    res.status(200).json(generalDepot);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getGeneralDepot = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { user } = req.user as any;

    if (!user || !user?.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let generals: any[] = [];
    if (user?.role?.name === "admin") {
      generals = await GeneralDepotModel.find().populate("manager products");
    } else if (user?.role?.name === "manager") {
      generals = await GeneralDepotModel.find({ manager: user._id }).populate(
        "manager products"
      );
    } else {
      generals = [];
    }

    res.status(200).json(generals);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getDetailGeneralDepot = async (req: Request, res: Response) => {
  try {
    const generalId = req.params.id;
    if (!generalId) {
      return res.status(400).json({ message: "General not found" });
    }

    const general = await GeneralDepotModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(generalId),
        },
      },
      {
        $lookup: {
          from: "shipping_warehouse",
          localField: "_id",
          foreignField: "toGeneralId",
          as: "shipping_warehouse",
        },
      },
      {
        $project: {
          _id: 1,
          toGeneralId: 1,
          orders: {
            _id: 1,
            products: 1,
            status: 1,
            transferDate: 1,
            deliveryDate: 1,
          },
        },
      },
      {
        $unwind: "$shipping_warehouse",
      },
      {
        $group: {
          _id: "$_id",

          totalOrders: {
            $sum: 1,
          },
          toGeneralId: {
            $first: "$toGeneralId",
          },
          orders: {
            $push: "$orders",
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalOrders: 1,
          orders: 1,
        },
      },
    ]);

    res.status(200).json(general);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getAllGeneralDepot = async (req: Request, res: Response) => {
  try {
    const general = await GeneralDepotModel.aggregate([
      {
        $lookup: {
          from: "shipping_warehouse",
          localField: "_id",
          foreignField: "toGeneralId",
          as: "shipping_warehouse",
        },
      },
      {
        $group: {
          _id: "$_id",
          customerData: { $first: "$$ROOT" },
          totalOrders: { $sum: { $size: "$shipping_warehouse" } },
        },
      },
      {
        $project: {
          _id: 0,
          general: "$customerData",
          totalOrders: 1,
        },
      },
    ]);
    return res.status(200).json(general);
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  createGeneralDepot,
  getGeneralDepot,
  getDetailGeneralDepot,
  getAllGeneralDepot,
};
