import { Request, Response } from "express";
import ProductModel from "../model/ProductModel";
import GeneralDepotModel from "../model/GeneralDepotModel";

const createProduct = async (req: Request, res: Response) => {
  try {
    const generalId = req.body.generalId;
    if (!generalId) {
      return res.status(400).json({ message: "ID General is required" });
    }

    const general = await GeneralDepotModel.findById(generalId);

    if (!general) {
      return res.status(400).json({ message: "General not found" });
    }

    const product = new ProductModel({
      ...req.body,
      generalId: general._id,
    });

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getListProducts = async (req: UserRequest, res: Response) => {
  const status = req.query.status;

  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { user } = req.user as any;

    if (!user || !user?.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let generals: any[] = [];
    if (user?.role?.name === "admin") {
      generals = await ProductModel.find({
        manager: user._id,
        status: status ? status : { $exists: true },
      }).populate("type generalId manager");
    } else if (user?.role?.name === "manager") {
      generals = await ProductModel.find({
        manager: user._id,
        status: status ? status : { $exists: true },
      }).populate("generalId type manager");
    } else {
      generals = [];
    }
    res.status(200).json(generals);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTypeProducts = async (req: UserRequest, res: Response) => {
  const status = req.query.status;
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { user } = req.user as any;

    if (!user || !user?.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let generals: any[] = [];
    if (user?.role?.name === "admin") {
      generals = await ProductModel.find({
        manager: user._id,
        status: status ? status : { $exists: true },
      }).populate("type generalId manager");
    } else if (user?.role?.name === "manager") {
      generals = await ProductModel.find({
        manager: user._id,
        status: status ? status : { $exists: true },
      }).populate("generalId type manager");
    } else {
      generals = [];
    }

    res.status(200).json(generals);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedProduct);
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

const searchProduct = async (req: UserRequest, res: Response) => {
  const keyword = req.query.keyword as string;
  if (!keyword.trim()) {
    return res.status(400).json({
      success: false,
      message: "Missing paramaters!",
    });
  }
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { user } = req.user as any;

    const nameProduct = new RegExp(keyword, "i");

    const results = await ProductModel.find({
      name_product: nameProduct,
      manager: user._id,
    });

    if (!results.length) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Lỗi tìm kiếm sản phẩm" });
  }
};

const getDetailProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId)
      .populate("type generalId manager")
      .populate({
        path: "transactionHistory.orderId",
      })
      .populate({
        path: "transactionHistory.staffId",
      })
      .populate({
        path: "stockAdjustmentHistory.stockAjustmentId",
      });

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
  getTypeProducts,
};
