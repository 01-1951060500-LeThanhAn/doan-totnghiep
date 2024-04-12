import { Request, Response } from "express";
import PartnerModel from "../model/PartnerModel";

const createPartner = async (req: Request, res: Response) => {
  try {
    const partner = new PartnerModel({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
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
    const partner = await PartnerModel.findById(partnerId);
    if (!partner) {
      return res.status(400).json({
        message: "Partner not found",
      });
    }
    return res.status(200).json(partner);
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

export { createPartner, getPartners, getInfoPartner, deletePartner };
