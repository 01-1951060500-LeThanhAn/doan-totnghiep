import { Request, Response } from "express";
import SupplierModel from "../model/SupplierModel";
import WarehouseModel from "../model/WarehouseModel";
import mongoose from "mongoose";

const createSupplier = async (req: Request, res: Response) => {
  const suppliers = new SupplierModel({
    ...req.body,
  });

  try {
    await suppliers.save();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getListSuppliers = async (req: Request, res: Response) => {
  try {
    const users = await SupplierModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// const getDetailSupplier = async (req: Request, res: Response) => {
//   const date = new Date();
//   const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const supplierId = req.params.id;
//   if (!supplierId) {
//     return res.status(400).json({ message: "Supplier not found" });
//   }

//   try {
//     const incomeData = await SupplierModel.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: previousMonth },
//           _id: new mongoose.Types.ObjectId(supplierId),
//         },
//       },
//       {
//         $lookup: {
//           from: "purchase_orders",
//           localField: "_id",
//           foreignField: "supplierId",
//           as: "purchase_orders",
//         },
//       },

//       {
//         $unwind: "$purchase_orders",
//       },
//       {
//         $project: {
//           _id: {
//             month: { $month: "$createdAt" },
//             supplier: "$purchase_orders.supplierId",
//           },

//           payment_status: "$purchase_orders.payment_status",
//           code: "$purchase_orders.code",
//           quantity: {
//             $first: "$purchase_orders.products.inventory_number",
//           },

//           total_price: "$purchase_orders.totalPrice",
//         },
//       },
//       {
//         $group: {
//           _id: "$_id.supplier",
//           code: {
//             $first: "$code",
//           },
//           payment_status: {
//             $first: "$payment_status",
//           },
//           total_quantity: { $sum: "$quantity" },
//           total_price: { $sum: "$total_price" },
//         },
//       },
//     ]);

//     return res.status(200).json(incomeData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching income and status data" });
//   }
// };

const getDetailSupplier = async (req: Request, res: Response) => {
  const supplierId = req.params.id;

  try {
    const history_warehouse = await WarehouseModel.find({
      supplierId,
    }).populate("products.productId supplierId generalId");

    const suppliers = await SupplierModel.findById(supplierId);

    if (!suppliers) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    if (!history_warehouse) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      results: suppliers,
      history_warehouse,
    });
  } catch (error) {
    console.error("Error fetching supplier details:", error);
    res.status(500).json({ message: "Error fetching supplier details" });
  }
};

const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateSupplier = await SupplierModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    await updateSupplier?.save();
    res.json(updateSupplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi cập nhật nhà cung cấp",
    });
  }
};

const deleteSupplier = async (req: Request, res: Response) => {
  const supplierId = req.params.id;

  try {
    const deleteSupplierId = await SupplierModel.findByIdAndDelete(supplierId);

    if (!deleteSupplierId) {
      return res.status(401).json({
        message: "Mã nhà cung cấp không hợp lệ hoặc không tồn tại",
      });
    }

    res.status(200).json({
      message: "Xóa nhà cung cấp thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi xóa nhà cung cấp",
    });
  }
};

export {
  createSupplier,
  getListSuppliers,
  updateSupplier,
  deleteSupplier,
  getDetailSupplier,
};
