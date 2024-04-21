import { Request, Response } from "express";
import GeneralDepotModel from "../model/GeneralDepotModel";

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
      query = {}; // All depots for admins
    } else if (user?.role?.name === "manager") {
      query = { manager: user._id }; // Depots managed by the user
    }

    const generals = await GeneralDepotModel.find(query)
      .populate({
        path: "manager",
        select: "-password -confirmPassword",
      })
      .populate({
        path: "products",
        populate: {
          path: "product",
        },
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

    const general = await GeneralDepotModel.findById(generalId);

    res.status(200).json(general);
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
