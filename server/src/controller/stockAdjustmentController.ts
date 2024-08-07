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

    const productInventories = await Promise.all(
      products.map(async (product: any) => {
        const productDoc = await ProductModel.findById(product.productId);
        if (!productDoc) {
          throw new Error(`Product not found: ${product.productId}`);
        }
        return { ...product, inventory_saved: productDoc.inventory_number };
      })
    );

    const stockAdjustment = new StockAdjustmentModel({
      ...req.body,
      staffId,
      generalId,
      stocktaking_day,
      products: productInventories,
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
    const detailStockAdjustment = await StockAdjustmentModel.findById(stockId)
      .populate({
        path: "staffId",
        select: "username email",
      })
      .populate({
        path: "generalId",
        select: "name",
      })
      .populate({
        path: "products",
        populate: {
          path: "productId",
          select: "name_product img code unit type inventory_number",
        },
      });
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
      {
        $set: req.body,
      },
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
      const productUpdates = updatedStockAdjustment.products.map(
        async (productAdjustment) => {
          const {
            productId,
            inventory_saved,
            inventory_discrepancy,
            inventory_number,
            inventory_total,
          } = productAdjustment;

          const product = await ProductModel.findByIdAndUpdate(
            productId,
            {
              $inc: {
                inventory_number:
                  inventory_number - inventory_discrepancy + inventory_total,
              },
              $push: {
                stockAdjustmentHistory: {
                  stockAjustmentId: updatedStockAdjustment._id,
                },
              },
            },
            { new: true }
          );

          if (!product) {
            console.error(`Error updating product ${productId}`);
          }

          return product;
        }
      );

      await Promise.all(productUpdates);
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

const searchStockAdjustmentOrder = async (req: Request, res: Response) => {
  const status = req.query.status as string;

  try {
    const stock = new RegExp(status, "i");

    const results = await StockAdjustmentModel.find({
      inventory_status: stock,
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
  createStockAdjustment,
  deleteStockAdjustment,
  updateStockAdjustment,
  getStockAdjustment,
  getDetailStockAdjustment,
  searchStockAdjustmentOrder,
};
