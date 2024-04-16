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

const getGeneralDepot = async (req: Request, res: Response) => {
  try {
    const generalDepot = await GeneralDepotModel.find().populate(
      "manager products"
    );

    res.status(200).json(generalDepot);
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
