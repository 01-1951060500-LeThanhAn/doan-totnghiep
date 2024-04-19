import { Request, Response } from "express";
import ShippingWarehouseModel from "../model/ShippingWarehouseModel";
import GeneralDepotModel from "../model/GeneralDepotModel";
import ProductModel from "../model/ProductModel";

async function createShippets(req: Request, res: Response) {
  try {
    const { fromGeneralId, toGeneralId, products, transferDate } = req.body;

    if (!fromGeneralId || !toGeneralId || !products || products.length === 0) {
      res.status(403).json("Invalid transfer data provided");
    }

    const mainWarehouse = await GeneralDepotModel.findById(fromGeneralId);
    const subWarehouse = await GeneralDepotModel.findById(toGeneralId);

    if (
      !mainWarehouse ||
      !subWarehouse ||
      mainWarehouse.type !== "main" ||
      subWarehouse.type !== "sub"
    ) {
      throw new Error("Invalid warehouse selection for transfer");
    }

    const updatePromises = products.map(async (product: any) => {
      const { productId, inventory_number } = product;

      const mainProduct = await ProductModel.findOne({
        _id: productId,
        generalId: mainWarehouse._id,
      });
      const subProduct = await ProductModel.findOne({
        _id: productId,
        generalId: subWarehouse._id,
      });

      if (!mainProduct) {
        throw new Error(`Product ${productId} not found in main warehouse`);
      }

      if (inventory_number > mainProduct.inventory_number) {
        throw new Error(
          `Insufficient inventory for product ${productId} in main warehouse`
        );
      }

      mainProduct.inventory_number -= inventory_number;

      if (subProduct) {
        subProduct.inventory_number += inventory_number;

        await subProduct.save();
      } else {
        const transferredProduct = {
          productId,
          inventory_number,
        };
        const newSubProduct = new ShippingWarehouseModel({
          products: transferredProduct,
          toGeneralId: subWarehouse._id,
          fromGeneralId: mainWarehouse._id,
          deliveryDate: new Date().toISOString(),
          transferDate,
          status: "pending",
        });

        await newSubProduct.save();
      }

      await mainProduct.save();
    });

    await Promise.all(updatePromises);

    const newTransferOrder = new ShippingWarehouseModel({
      fromGeneralId,
      toGeneralId: subWarehouse._id,
      products,
      transferDate,
      deliveryDate: new Date().toISOString(),
      status: "pending",
    });

    res.status(200).json(newTransferOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const getShippets = async (req: Request, res: Response) => {
  try {
    const ships = await ShippingWarehouseModel.find();

    return res.status(200).json(ships);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteShippets = async (req: Request, res: Response) => {
  const shippId = req.params.id;

  if (!shippId) {
    return res
      .status(400)
      .json({ message: "Missing required data for transfer." });
  }

  try {
    const ships = await ShippingWarehouseModel.findByIdAndDelete(shippId);
    if (!ships) {
      return res.status(400).json({ message: "Shipping not found" });
    }

    res.status(200).json({ message: "Shipping deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateShippets = async (req: Request, res: Response) => {
  try {
    const shipId = req.params.id;
    if (!shipId) {
      return res
        .status(400)
        .json({ message: "Missing required data for transfer." });
    }
    const transferDoc = await ShippingWarehouseModel.findByIdAndUpdate(
      shipId,
      { $set: req.body },
      { new: true }
    );

    if (!transferDoc) {
      res.status(404).json({ message: "Transfer document not found" });
      return;
    }

    const generalDoc = await GeneralDepotModel.findById(
      transferDoc.toGeneralId
    );
    if (!generalDoc) {
      res
        .status(500)
        .json({ message: "Error retrieving main warehouse document" });
      return;
    }
    generalDoc.products.push(transferDoc._id);
    await generalDoc.save();

    res.status(200).json({
      message: "Transfer status updated and added to general document",
      generalDoc,
    });
  } catch (error) {
    console.error(
      "Error updating transfer status and general document:",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};
export { createShippets, getShippets, deleteShippets, updateShippets };
