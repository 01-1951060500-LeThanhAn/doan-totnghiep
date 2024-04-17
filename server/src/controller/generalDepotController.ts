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
    const generalDepot = await GeneralDepotModel.findById(
      req.params.id
    ).populate("manager products");
    if (!generalDepot) {
      return res.status(404).json({
        message: "General Depot not found",
      });
    }

    res.status(200).json(generalDepot);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export { createGeneralDepot, getGeneralDepot, getDetailGeneralDepot };
