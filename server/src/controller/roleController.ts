import { Request, Response } from "express";
import RoleModel from "../model/RoleModel";
const createRoles = async (req: Request, res: Response) => {
  try {
    const { name, permissions } = req.body;
    const existingRole = await RoleModel.findOne({ name });
    if (existingRole) {
      throw new Error(`Role with name "${req.body.name}" already exists.`);
    }

    const role = new RoleModel({ name, permissions });
    await role.save();

    res.status(200).json(role);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await RoleModel.find();
    res.status(200).json(roles);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export { createRoles, getRoles };
