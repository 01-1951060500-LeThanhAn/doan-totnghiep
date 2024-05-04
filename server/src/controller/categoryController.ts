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
    const category = await CategoryModel.find();

    res.status(200).json(category);
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
