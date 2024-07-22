import { Request, Response } from "express";
import ImportOrderModel from "../model/PurchaseOrderModel";
import WarehouseModel from "../model/WarehouseModel";
import ProductModel from "../model/ProductModel";
import SupplierModel from "../model/SupplierModel";

const createImportOrder = async (req: Request, res: Response) => {
  try {
    const { supplierId, products } = req.body;
    if (!supplierId || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const totalQuantity = products.reduce(
      (acc: number, product: any) => acc + Number(product.inventory_number),
      0
    );
    const supplier = await SupplierModel.findById(supplierId);

    if (!supplier) {
      return res.status(400).json({ message: "supplierId not found" });
    }

    let totalPrice = 0;
    for (const product of products) {
      const productData = await ProductModel.findById(product.productId);
      if (!productData) {
        return res
          .status(400)
          .json({ message: `Product not found: ${product.productId}` });
      }

      totalPrice = products.reduce(
        (acc: number, product: any) =>
          acc +
          Number(product.inventory_number) * Number(productData.import_price),
        0
      );
    }

    const newImportOrder = new ImportOrderModel({
      ...req.body,
      totalQuantity,
    });

    const currentBalance =
      supplier.balance_increases + supplier.opening_balance;
    await SupplierModel.findByIdAndUpdate(supplierId, {
      balance_increases: currentBalance + totalPrice,
      ending_balance: currentBalance + totalPrice,
    });

    await newImportOrder.save();
    res.status(200).json(newImportOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllOrderImport = async (req: Request, res: Response) => {
  try {
    const orders = await ImportOrderModel.find()
      .populate("products.productId supplierId generalId")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateImportOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    if (!orderId) return res.status(404).json("Đơn đặt hàng này không tồn tại");

    const order = await ImportOrderModel.findByIdAndUpdate(
      orderId,
      {
        order_status: "entered",
      },
      { new: true }
    );

    if (!order) {
      throw new Error("Order not found");
    }

    const productUpdates = order.products.map(async (product: any) => {
      const { productId, inventory_number } = product;

      if (!productId || !inventory_number) {
        return res.status(400).json({ message: "Missing product details" });
      }

      await ProductModel.findOneAndUpdate(
        { _id: productId },
        {
          $inc: {
            pendingWarehouseQuantity: product.inventory_number,
            inventory_number: inventory_number,
          },
        },
        { upsert: true, new: true }
      );
    });

    await Promise.all(productUpdates);

    const totalQuantity = order.products.reduce(
      (acc: number, product: any) => acc + Number(product.inventory_number),
      0
    );
    const newWarehouseEntry = new WarehouseModel({
      code: order.code,
      totalQuantity,
      products: order.products,
      manager: order.staffId,
      delivery_date: order.received_date,
      supplierId: order.supplierId,
      generalId: order.generalId,
      order_status: order.order_status,
      payment_status: order.payment_status,
    });

    await newWarehouseEntry.save();

    res.status(200).json({
      message: "Order updated successfully",
      newWarehouseEntry,
    });
  } catch (error) {
    console.error("Error creating warehouse entry:", error);
    res.status(500).json({
      message: "Server not found",
    });
  }
};

const getDetailImportOrder = async (req: Request, res: Response) => {
  const orderImportId = req.params.id;

  if (!orderImportId) {
    return res.status(404).json("Đơn đặt hàng này không tồn tại");
  }

  try {
    const data = await ImportOrderModel.findById(orderImportId)
      .populate("products.productId")
      .populate({
        path: "generalId",
        select: "-createdAt -updatedAt -manager -products -type",
      })
      .populate({
        path: "supplierId",
        select: "-createdAt -updatedAt -desc -userId -tax_code -website",
      });
    if (!data) {
      return res.status(404).json({
        message: "Đơn đặt hàng này không tồn tại",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteImportOrder = async (req: Request, res: Response) => {
  const orderImportId = req.params.id;
  if (!orderImportId) {
    return res.status(404).json("Đơn đặt hàng này không tồn tại");
  }

  try {
    const order = await ImportOrderModel.findByIdAndDelete(orderImportId);
    if (!order) {
      return res.status(404).json("Đơn đặt hàng này không tồn tại");
    }
    res.status(200).json("Đã xóa đơn đặt hàng thành công");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getIncomePurchaseOrders = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const incomeData = await ImportOrderModel.aggregate([
      {
        $match: {
          updatedAt: { $gte: previousMonth },
          order_status: "entered",
        },
      },
      {
        $project: {
          _id: {
            $dateToString: { format: "%m/%Y", date: "$updatedAt" },
          },
          month: { $month: "$updatedAt" },
          totalQuantity: {
            $sum: "$products.inventory_number",
          },
          totalOrders: { $sum: 1 },
          totalPrice: "$totalPrice",
        },
      },
      {
        $group: {
          _id: "$_id",
          month: { $first: "$month" },
          totalQuantity: { $sum: "$totalQuantity" },
          totalPrice: { $sum: "$totalPrice" },
          totalOrders: { $sum: "$totalOrders" },
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    return res.status(200).json(incomeData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching income and purchase orders data" });
  }
};

const getIncomePurchaseOrdersProducts = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
  try {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: previousMonth },
          order_status: "entered",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          productId: "$product._id",
          productName: "$product.name_product",
          productCode: "$product.code",
          quantity: "$products.inventory_number",
          price: "$product.import_price",
          totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
        },
      },
      {
        $group: {
          _id: "$productId",
          productName: { $first: "$productName" },
          productCode: { $first: "$productCode" },
          totalQuantity: { $sum: "$quantity" },
          totalPrice: { $sum: "$totalPrice" },
          price: { $first: "$price" },
        },
      },
    ];

    const results = await ImportOrderModel.aggregate(pipeline);

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getIncomePurchaseOrdersSuppliers = async (
  req: Request,
  res: Response
) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const incomeData = await ImportOrderModel.aggregate([
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
            _id: "$suppliers._id",
            name: "$suppliers.supplier_name",
          },
          totalQuantity: { $sum: "$products.inventory_number" },
          totalOrders: { $sum: 1 },
          totalPrice: {
            $sum: "$totalPrice",
          },
        },
      },
      {
        $group: {
          _id: "$_id._id",
          name: { $first: "$_id.name" },
          code: { $first: "$_id.code" },
          month: { $first: "$_id.month" },
          totalQuantity: { $sum: "$totalQuantity" },
          totalPrice: { $sum: "$totalPrice" },
          totalOrders: { $sum: "$totalOrders" },
        },
      },
    ]);

    res.status(200).json(incomeData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching income data by supplier" });
  }
};

export {
  createImportOrder,
  getAllOrderImport,
  updateImportOrder,
  getDetailImportOrder,
  deleteImportOrder,
  getIncomePurchaseOrders,
  getIncomePurchaseOrdersProducts,
  getIncomePurchaseOrdersSuppliers,
};
