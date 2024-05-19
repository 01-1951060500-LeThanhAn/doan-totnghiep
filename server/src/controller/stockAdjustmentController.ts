import { Request, Response } from "express";
import StockAdjustmentModel from "../model/StockAdjustmentModel";
import ProductModel from "../model/ProductModel";

const createStockAdjustment = async (req: Request, res: Response) => {
  try {
    const { staffId, products, stocktaking_day, generalId } = req.body;
    if (
      !staffId ||
      !stocktaking_day ||
      !generalId ||
      !products ||
      products.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const stockAdjustment = new StockAdjustmentModel({
      ...req.body,
      staffId,
      generalId,
      stocktaking_day,
      products,
    });

    await stockAdjustment.save();

    return res
      .status(200)
      .json({ message: "Stock adjustment created", stockAdjustment });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getStockAdjustment = async (req: Request, res: Response) => {
  try {
    const stockAdjustments = await StockAdjustmentModel.find();
    return res.status(200).json(stockAdjustments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDetailStockAdjustment = async (req: Request, res: Response) => {
  const stockId = req.params.id;
  if (!stockId) {
    return res.status(401).json({ message: "Stock ID not found" });
  }

  try {
    const detailStockAdjustment = await StockAdjustmentModel.findById(stockId);
    if (!detailStockAdjustment) {
      return res.status(404).json({ message: "Stock adjustment not found" });
    }

    return res.status(200).json(detailStockAdjustment);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateStockAdjustment = async (req: Request, res: Response) => {
  const inventoryId = req.params.id;
  if (!inventoryId) {
    return res.status(400).json({ message: "Inventory ID is required" });
  }

  try {
    const updatedStockAdjustment = await StockAdjustmentModel.findByIdAndUpdate(
      inventoryId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedStockAdjustment) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy phiếu kiểm hàng" });
    }

    const inventoryStatus =
      updatedStockAdjustment?.inventory_status === "completed";

    if (inventoryStatus) {
      for (const product of updatedStockAdjustment.products) {
        const productDoc = await ProductModel.findById(product.productId);
        if (!productDoc) {
          throw new Error("Product not found");
        }
        const inventoryDifference =
          product.inventory_number - productDoc.inventory_number;

        await ProductModel.findByIdAndUpdate(product.productId, {
          $inc: {
            inventory_number: inventoryDifference,
          },
        });
      }
    }

    res.status(200).json(updatedStockAdjustment);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteStockAdjustment = async (req: Request, res: Response) => {
  const stockId = req.params.id;
  if (!stockId) {
    return res.status(401).json({ message: "Stock ID not found" });
  }

  try {
    const deletedStockAdjustment = await StockAdjustmentModel.findByIdAndDelete(
      stockId
    );
    if (!deletedStockAdjustment) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy phiếu kiểm hàng" });
    }

    res.status(200).json({
      message: "Phiếu kiểm đã được xóa.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createStockAdjustment,
  deleteStockAdjustment,
  updateStockAdjustment,
  getStockAdjustment,
  getDetailStockAdjustment,
};
