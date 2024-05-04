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

    let query: any = {};

    if (user?.role?.name === "admin") {
      query = {};
    } else if (user?.role?.name === "manager") {
      query = { manager: user._id };
    }

    const generals = await GeneralDepotModel.find(query).populate({
      path: "manager",
      select: "-password -confirmPassword",
    });

    res.status(200).json(generals);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const getDetailGeneralDepot = async (req: Request, res: Response) => {
  try {
    const generalId = req.params.id;
    if (!generalId) {
      return res.status(400).json({ message: "General not found" });
    }

    const results = await GeneralDepotModel.findById(generalId);

    const general = await GeneralDepotModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(generalId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "generalId",
          as: "products",
        },
      },
      {
        $project: {
          _id: 1,
          products: {
            _id: 1,
            generalId: 1,
            code: 1,
            name_product: 1,
            import_price: 1,
            export_price: 1,
            inventory_number: 1,
            status: 1,
            img: 1,
            type: 1,
            unit: 1,
            desc: 1,
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$_id",
          type: {
            $first: "$products.type",
          },
          products: {
            $push: "$products",
          },
        },
      },

      {
        $project: {
          _id: 1,
          products: 1,
          type: 1,
        },
      },
    ]);

    return res.status(200).json({
      results,
      general,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateGeneralDepot = async (req: Request, res: Response) => {
  try {
    const generalId = req.params.id;

    if (!generalId) {
      return res.status(400).json({ message: "General not found" });
    }

    const updatedGeneral = await GeneralDepotModel.findByIdAndUpdate(
      generalId,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json("General updated");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {
  createGeneralDepot,
  getGeneralDepot,
  getDetailGeneralDepot,
  updateGeneralDepot,
};
