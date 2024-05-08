import { Request, Response } from "express";
import CategoryModel from "../model/CategoryModel";

const createCategoryProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const category = new CategoryModel({
      ...req.body,
    });

    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCategoryProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const results = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "type",
          as: "products",
        },
      },
      {
        $group: {
          _id: "$_id",
          type: { $first: "$$ROOT" },
          total_products: { $sum: { $size: "$products" } },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$type",
          total_products: 1,
        },
      },
    ]);
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDetailCategoryProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(401).json({
        message: "Mã danh mục sản phẩm không hợp lệ hoặc không tồn tại",
      });
    }

    const category = await CategoryModel.findById(categoryId);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCategoryProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const categoryParams = req.params.id;

  try {
    const categoryId = await CategoryModel.findByIdAndDelete(categoryParams);

    if (!categoryId) {
      return res.status(401).json({
        message: "Mã danh mục sản phẩm không hợp lệ hoặc không tồn tại",
      });
    }

    res.status(200).json({
      message: "Xóa danh mục sản phẩm thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi xóa danh mục sản phẩm",
    });
  }
};

export {
  createCategoryProduct,
  getCategoryProduct,
  deleteCategoryProduct,
  getDetailCategoryProduct,
};
