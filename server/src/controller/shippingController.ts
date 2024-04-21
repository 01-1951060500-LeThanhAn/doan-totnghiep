import { Request, Response } from "express";
import ShippingWarehouseModel from "../model/ShippingWarehouseModel";
import GeneralDepotModel from "../model/GeneralDepotModel";
import ProductModel from "../model/ProductModel";
import TransactionModel from "../model/TransactionModel";

async function createShippets(req: Request, res: Response) {
  try {
    const { fromGeneralId, toGeneralId, products, transferDate } = req.body;

    if (!fromGeneralId || !toGeneralId || !products || products.length === 0) {
      res.status(403).json("Invalid transfer data provided");
    }

    const mainWarehouse = await GeneralDepotModel.findOne({
      type: "main",
      _id: fromGeneralId,
    });
    const subWarehouse = await GeneralDepotModel.findOne({
      type: "sub",
      _id: toGeneralId,
    });

    if (!mainWarehouse || !subWarehouse) {
      throw new Error("Invalid warehouse selection for transfer");
    }

    const updatePromises = products.map(async (product: any) => {
      const { productId, inventory_number } = product;

      const mainProduct = await ProductModel.findOne({
        _id: productId,
        generalId: mainWarehouse._id,
      });
      const subProduct = await ProductModel.findOne({
        generalId: subWarehouse._id,
        _id: productId,
      });

      if (mainProduct) {
        mainProduct.inventory_number -= inventory_number;
        await mainProduct.save();
      }

      if (subProduct) {
        subProduct.inventory_number += +inventory_number;
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
    });

    await Promise.all(updatePromises);

    const newTransferOrder = new ShippingWarehouseModel({
      fromGeneralId: mainWarehouse._id,
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
    const ships = await ShippingWarehouseModel.find().populate({
      path: "toGeneralId.manager",
      select: "username email address",
    });

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
  const shippId = req.params.id;
  try {
    const ships = await ShippingWarehouseModel.findById(shippId);

    if (!ships) {
      return res.status(404).json({ message: "Shipping not found" });
    }

    const data = await ShippingWarehouseModel.findByIdAndUpdate(
      shippId,
      req.body,
      {
        new: true,
      }
    );

    const targetWarehouse = await GeneralDepotModel.findOne({
      type: "sub",
      _id: ships.toGeneralId,
    });

    if (!targetWarehouse) {
      return res.status(400).json({ message: "Warehouse not found" });
    }

    for (let product of ships.products) {
      const { inventory_number, productId } = product;

      const subProduct = await ProductModel.findOne({
        _id: productId,
        generalId: targetWarehouse._id,
      });

      const results = await ProductModel.findById(product.productId);

      if (!subProduct || results) {
        const newProduct = new ProductModel({
          ...results,
          name_product: results?.name_product,
          desc: results?.desc,
          img: results?.name_product,
          export_price: results?.export_price,
          import_price: results?.import_price,
          unit: results?.unit,
          code: results?.code,
          inventory_number: inventory_number,
          generalId: targetWarehouse._id,
        });

        await newProduct.save();
      } else {
        return res.status(400).json({ message: "Product not found" });
      }
    }

    const transactionHistory = new TransactionModel({
      transaction_type: "order",
      transaction_date: Date.now(),
      shipId: data?._id,
    });

    await transactionHistory.save();

    res.status(200).json({ message: "Shipping updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const getDetailShippets = async (req: Request, res: Response) => {
  const shipId = req.params.id;

  if (!shipId) {
    return res.status(400).json({ message: "Missing required data." });
  }

  try {
    const results = await ShippingWarehouseModel.findById(shipId)
      .populate({
        path: "fromGeneralId",
        select: "name type address manager",
      })

      .populate({
        path: "toGeneralId",
        select: "name type address manager",
      })
      .populate({
        path: "products.productId",
        select: "-_id name code", // Select specific product fields (exclude _id)
      });

    if (!results) {
      return res.status(404).json({ message: "Shipping not found" });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export {
  createShippets,
  getShippets,
  deleteShippets,
  updateShippets,
  getDetailShippets,
};
