import { Request, Response } from "express";
import PartnerModel from "../model/PartnerModel";
import mongoose from "mongoose";

const createPartner = async (req: Request, res: Response) => {
  try {
    const partner = new PartnerModel({
      ...req.body,
    });

    await partner.save();
    return res.status(200).json(partner);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getPartners = async (req: Request, res: Response) => {
  try {
    const partners = await PartnerModel.find();

    return res.status(200).json(partners);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getInfoPartner = async (req: Request, res: Response) => {
  const partnerId = req.params.id;
  if (!partnerId) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const results = await PartnerModel.findById(partnerId).populate({
      path: "staffIncharge",
      select: "username email",
    });
    if (!results) {
      return res.status(400).json({
        message: "Partner not found",
      });
    }
    const partner = await PartnerModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(partnerId),
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "partnerId",
          as: "orders",
        },
      },
      {
        $project: {
          _id: 1,
          partnerId: 1,
          orders: {
            _id: 1,
            products: 1,
            generalId: 1,
            totalCustomerPay: 1,
            payment_status: 1,
            code: 1,
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
            $sum: {
              $cond: [
                { $eq: ["$orders.payment_status", "paid"] },
                "$orders.totalCustomerPay",
                0,
              ],
            },
          },
          totalOrders: {
            $sum: 1,
          },
          partnerId: {
            $first: "$partnerId",
          },
          orders: {
            $push: "$orders",
          },
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          totalSpending: 1,
          totalOrders: 1,
          orders: 1,
        },
      },
    ]);
    return res.status(200).json({
      results,
      partner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updatePartner = async (req: Request, res: Response) => {
  const partnerId = req.params.id;
  if (!partnerId) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const partner = await PartnerModel.findByIdAndUpdate(partnerId, req.body, {
      new: true,
    });
    if (!partner) {
      return res.status(400).json({
        message: "Partner not found",
      });
    }
    return res.status(200).json({
      message: "Partner updated",
      results: partner,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deletePartner = async (req: Request, res: Response) => {
  const partnerId = req.params.id;
  if (!partnerId) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const partner = await PartnerModel.findByIdAndDelete(partnerId);
    if (!partner) {
      return res.status(400).json({
        message: "Partner not found",
      });
    }
    return res.status(200).json({
      message: "Partner deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const searchPartner = async (req: Request, res: Response) => {
  const status = req.query.status as string;

  try {
    const newStatus = new RegExp(status, "i");

    const results = await PartnerModel.find({
      status: newStatus,
    });

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

export {
  createPartner,
  getPartners,
  getInfoPartner,
  deletePartner,
  updatePartner,
  searchPartner,
};
