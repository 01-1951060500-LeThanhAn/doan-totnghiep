import { Request, Response } from "express";
import ProductModel from "../model/ProductModel";
import WarehouseModel from "../model/WarehouseModel";

const createWareHouse = async (req: Request, res: Response) => {
  try {
    const {
      productId,
      inventory_number,
      import_price,
      supplierId,
      payment_status,
    } = req.body;

    if (!productId || !supplierId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    await ProductModel.findOneAndUpdate(
      { _id: productId },
      { $inc: { inventory_number: inventory_number } },
      { upsert: true, new: true }
    );

    const totalPrice = inventory_number * import_price;

    const warehouse = new WarehouseModel({
      productId: product._id,
      inventory_number,
      import_price,
      totalPrice,
      payment_status,
      supplierId,
    });

    await warehouse.save();
    res.status(200).json(warehouse);
  } catch (error) {
    console.error("Error creating warehouse entry:", error);
    res.status(500).json(error);
  }
};

const getWareHouse = async (req: Request, res: Response) => {
  try {
    const warehouse = await WarehouseModel.find().populate(
      "supplierId productId"
    );

    return res.status(200).json(warehouse);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteWarehouse = async (req: Request, res: Response) => {
  const warehouseId = req.params.id;

  try {
    const deleteProductId = await WarehouseModel.findByIdAndDelete(warehouseId);

    if (!deleteProductId) {
      return res.status(401).json({
        message: "Mã đơn nhập hàng không hợp lệ hoặc không tồn tại",
      });
    }

    res.status(200).json({
      message: "Xóa đơn nhập hàng thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi xóa đơn nhập hàng",
    });
  }
};

const getIncomeWarehouse = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const [incomeData] = await Promise.all([
      WarehouseModel.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
          },
        },
        {
          $project: {
            _id: { $month: "$createdAt" },
            total_quantity: "$inventory_number",
            total_sold_products: "$totalPrice",
          },
        },
        {
          $group: {
            _id: "$_id",
            total_income: { $sum: "$total_quantity" },
            total_sold_products: { $sum: "$total_sold_products" },
          },
        },
      ]),
    ]);

    res.status(200).json(incomeData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching income and status data" });
  }
};

const getWareHouseByProduct = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const incomeData = await WarehouseModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },

      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          _id: {
            month: { $month: "$createdAt" },
            product: "$products.name_product",
          },
          total_quantity: "$products.inventory_number",
          total_price: {
            $multiply: ["$products.inventory_number", "$products.import_price"],
          },
        },
      },
      {
        $group: {
          _id: "$_id.product",

          total_quantity: { $sum: "$total_quantity" },
          total_income: { $sum: "$total_price" },
        },
      },
    ]);

    const response = {
      incomeData,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching income data by product" });
  }
};

const getWareHouseBySupplier = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const incomeData = await WarehouseModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $lookup: {
          from: "suppliers",
          localField: "supplierId",
          foreignField: "_id",
          as: "suppliers",
        },
      },
      {
        $unwind: "$suppliers",
      },
      {
        $project: {
          _id: {
            month: { $month: "$createdAt" },
            supplier: "$suppliers.supplier_name",
            code: "$suppliers.supplier_code",
          },
          total_quantity: "$inventory_number",
          total_price: {
            $multiply: ["$inventory_number", "$import_price"],
          },
        },
      },
      {
        $group: {
          _id: "$_id.code",
          total_quantity: { $sum: "$total_quantity" },
          total_income: { $sum: "$total_price" },
        },
      },
    ]);
    const response = {
      incomeData,
    };
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching income data by supplier" });
  }
};

export {
  createWareHouse,
  getWareHouseByProduct,
  getWareHouse,
  deleteWarehouse,
  getIncomeWarehouse,
  getWareHouseBySupplier,
};
