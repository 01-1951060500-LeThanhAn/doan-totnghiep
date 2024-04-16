import { Request, Response } from "express";
import ProductModel from "../model/ProductModel";
import GeneralDepotModel from "../model/GeneralDepotModel";

const createProduct = async (req: Request, res: Response) => {
  const product = new ProductModel({
    ...req.body,
  });

  try {
    await product.save();

    await GeneralDepotModel.findByIdAndUpdate(req.body.generalId, {
      $push: { products: product._id },
    });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getListProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find().populate("type");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const deleteProductId = await ProductModel.findByIdAndDelete(productId);

    if (!deleteProductId) {
      return res.status(401).json({
        message: "Mã sản phẩm không hợp lệ hoặc không tồn tại",
      });
    }

    res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi xóa sản phẩm",
    });
  }
};

const searchProduct = async (req: Request, res: Response) => {
  const query = req.query.keyword;
  const name = req.query.name;
  try {
    const products = await ProductModel.find({
      $or: [
        { material_name: { $regex: query, $options: "i" } }, // Case-insensitive search for material_name
        { material_code: { $regex: name, $options: "i" } }, // Case-insensitive search for material_code
      ],
    });
    if (!products.length) {
      return res.status(401).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    throw error; // Re-throw the error for proper handling
  }
};

const getDetailProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Sản phẩm không tồn tại",
      });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi hiển thị chi tiết sản phẩm",
    });
  }
};

export {
  createProduct,
  getListProducts,
  updateProduct,
  deleteProduct,
  searchProduct,
  getDetailProduct,
};
