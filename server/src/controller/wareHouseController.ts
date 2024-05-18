import { Request, Response } from "express";
import ProductModel from "../model/ProductModel";
import WarehouseModel from "../model/WarehouseModel";
import GeneralDepotModel from "../model/GeneralDepotModel";
import TransactionModel from "../model/TransactionModel";
import SupplierModel from "../model/SupplierModel";

const createWareHouse = async (req: Request, res: Response) => {
  try {
    const { supplierId, products, delivery_date, generalId, manager } =
      req.body;

    if (
      !supplierId ||
      !delivery_date ||
      !generalId ||
      !manager ||
      !products ||
      products.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const supplier = await SupplierModel.findById(supplierId);

    if (!supplier) {
      return res.status(400).json({ message: "supplierId not found" });
    }

    for (const product of products) {
      await ProductModel.findByIdAndUpdate(product.productId, {
        $inc: { pendingWarehouseQuantity: product.quantity },
      });
    }

    const productUpdates = products?.map(async (product: any) => {
      const { productId, inventory_number } = product;

      if (!productId || !inventory_number) {
        return res.status(400).json({ message: "Missing product details" });
      }

      const existingProduct = await ProductModel.findById(productId);
      const existGeneral = await GeneralDepotModel.findOne({
        type: "sub",
        _id: req.body.generalId,
      });

      if (!existingProduct) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      if (existGeneral?.type === "sub") {
        const newProduct = new ProductModel({
          name_product: existingProduct.name_product,
          code: existingProduct.code,
          generalId: existGeneral?._id,
          manager: req.body.manager,
          type: existingProduct.type,
          unit: existingProduct.unit,
          import_price: existingProduct.import_price,
          export_price: existingProduct.export_price,
          inventory_number: inventory_number,
          status: "stocking",
          img: existingProduct.img,
          desc: existingProduct.desc,
        });

        await newProduct.save();
      } else {
        await ProductModel.findOneAndUpdate(
          { _id: productId, generalId: existingProduct?.generalId },
          { $inc: { inventory_number } },
          { upsert: true, new: true }
        );
      }
    });
    await Promise.all([productUpdates]);

    const totalQuantity = products.reduce(
      (acc: number, product: any) => acc + Number(product.inventory_number),
      0
    );

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
          Number(product.inventory_number) * Number(productData.export_price),
        0
      );
    }

    const warehouse = new WarehouseModel({
      ...req.body,
      supplierId: supplier._id,
      totalQuantity,
      payment_status: "pending",
    });

    const currentBalance =
      supplier.balance_increases + supplier.opening_balance;
    await SupplierModel.findByIdAndUpdate(supplierId, {
      balance_increases: currentBalance + totalPrice,
      ending_balance: currentBalance + totalPrice,
    });

    const newWarehouse = await warehouse.save();

    res.status(200).json(newWarehouse);
  } catch (error) {
    console.error("Error creating warehouse entry:", error);
    res.status(500).json(error);
  }
};

const getWareHouse = async (req: Request, res: Response) => {
  try {
    const warehouse = await WarehouseModel.find().populate(
      "supplierId products.productId generalId"
    );

    return res.status(200).json(warehouse);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInfoWareHouse = async (req: Request, res: Response) => {
  const warehouseId = req.params.id;
  if (!warehouseId) {
    return res.status(400).json({
      message: "Mã đơn nhập hàng không hợp lệ hoặc không tồn tại",
    });
  }
  try {
    const detailWarehouse = await WarehouseModel.findById(warehouseId)
      .populate({
        path: "generalId",
        select: "-products -createdAt -updatedAt",
      })
      .populate({
        path: "supplierId",
        select: "-createdAt -updatedAt -userId -website -desc -tax_code",
      })
      .populate({
        path: "products.productId",
      });
    if (!detailWarehouse) {
      return res.status(401).json({
        message: "Mã đơn nhập hàng không hợp lệ hoặc không tồn tại",
      });
    }

    const totalPrice = detailWarehouse?.products.reduce(
      (acc: number, product: any) =>
        acc + product.inventory_number * product.import_price,
      0
    );
    const totalQuantity = detailWarehouse?.products.reduce(
      (acc: number, product: any) => acc + Number(product.inventory_number),
      0
    );

    const results = {
      detailWarehouse,
      totalPrice,
      totalQuantity,
    };

    res.status(200).json(detailWarehouse);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Lỗi khi hiển thị đơn nhập hàng",
    });
  }
};

const updateWarehouse = async (req: Request, res: Response) => {
  const warehouseId = req.params.id;
  if (!warehouseId) {
    return res.status(400).json({
      message: "Mã đơn nhập hàng không hợp lệ hoặc không tồn tại",
    });
  }

  try {
    const originalWarehouseData = await WarehouseModel.findById(warehouseId);

    const updatedWarehouseData = await WarehouseModel.findByIdAndUpdate(
      warehouseId,
      {
        payment_status: "delivered",
      },
      {
        new: true,
      }
    );

    if (!updatedWarehouseData) {
      return res.status(404).json({ message: "Không tìm thấy đơn nhập hàng" });
    }

    const paymentStatusChangedToPaid =
      originalWarehouseData?.payment_status !== "delivered" &&
      updatedWarehouseData?.payment_status === "delivered";

    if (paymentStatusChangedToPaid) {
      const supplierId = updatedWarehouseData.supplierId;
      const totalPrice = updatedWarehouseData.totalPrice;

      const supplier = await SupplierModel.findById(supplierId);

      const currentBalanceIncreases = supplier?.balance_increases || 0;
      const currentBalanceDecreases = supplier?.balance_decreases || 0;
      const remainingDecreases =
        currentBalanceIncreases - currentBalanceDecreases;
      const updatedBalanceDecreases =
        currentBalanceDecreases + Number(totalPrice);
      const updatedRemainingDecreases = Math.max(
        remainingDecreases - Number(totalPrice),
        0
      );
      await SupplierModel.findByIdAndUpdate(supplierId, {
        balance_decreases: updatedBalanceDecreases,
        remaining_decreases: updatedRemainingDecreases,
        ending_balance: updatedRemainingDecreases,
      });

      for (const product of updatedWarehouseData.products) {
        await ProductModel.findByIdAndUpdate(product.productId, {
          $inc: { pendingWarehouseQuantity: -product.inventory_number },
        });
      }
    }

    if (updatedWarehouseData) {
      await WarehouseModel.findByIdAndUpdate(updatedWarehouseData?._id, {
        $inc: { totalPrice: -updatedWarehouseData?.totalPrice },
      });
    }

    const transactionHistory = new TransactionModel({
      transaction_type: "import",
      transaction_date: Date.now(),
      warehouseId: updatedWarehouseData?._id,
    });

    await transactionHistory.save();

    res.status(200).json(updatedWarehouseData);
  } catch (error) {
    console.log(error);
    res.status(500).json("Server not found");
  }
};

const deleteWarehouse = async (req: Request, res: Response) => {
  const warehouseId = req.params.id;
  if (!warehouseId) {
    return res.status(400).json({
      message: "Lỗi khi xóa giỏ đơn nhập hàng",
    });
  }
  try {
    const deleteProductId = await WarehouseModel.findByIdAndDelete(warehouseId);
    if (!deleteProductId) {
      return res.status(404).json({ message: "Đơn nhập hàng không tồn tại" });
    }

    const supplierId = deleteProductId?.supplierId;
    const orderTotalPrice = deleteProductId.totalPrice;

    const supplier = await SupplierModel.findById(supplierId);
    if (!supplier) {
      throw new Error(`Supplier not found: ${supplierId}`);
    }

    const updatedBalanceIncreases = Math.max(
      supplier.balance_increases - orderTotalPrice,
      0
    );
    const updatedRemainingDecreases =
      supplier.opening_balance +
      updatedBalanceIncreases -
      supplier.balance_decreases;
    const updatedEndingBalance = updatedRemainingDecreases;

    await SupplierModel.findByIdAndUpdate(supplierId, {
      balance_increases: updatedBalanceIncreases,
      remaining_decreases: updatedRemainingDecreases,
      ending_balance: updatedEndingBalance,
    });

    if (deleteProductId.payment_status === "pending") {
      for (const product of deleteProductId.products) {
        await ProductModel.findByIdAndUpdate(product.productId, {
          $inc: { pendingWarehouseQuantity: -product.inventory_number },
        });
      }
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
            total_quantity: {
              $sum: "$products.inventory_number",
            },
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
        $project: {
          _id: {
            month: "$createdAt",
            productId: "$products.productId",
          },
          product_name: { $first: "$product.name_product" },
          product_code: { $first: "$product.code" },
          quantity: "$products.inventory_number",
          price: "$import_price",
          total_price: {
            $multiply: ["$products.inventory_number", "$products.import_price"],
          },
        },
      },
      {
        $group: {
          _id: "$_id.productId",
          month: { $first: "$_id.month" },
          name: { $first: "$product_name" },
          code: { $first: "$product_code" },
          total_quantity: { $sum: "$quantity" },
          total_income: { $sum: "$total_price" },
        },
      },
    ]);

    res.status(200).json(incomeData);
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
          total_quantity: { $sum: "$products.inventory_number" },
          total_price: {
            $sum: "$totalPrice",
          },
        },
      },
      {
        $group: {
          _id: "$_id.code",
          total_quantity: { $sum: "$total_quantity" },
          total_price: { $sum: "$total_price" },
        },
      },
    ]);

    res.status(200).json(incomeData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching income data by supplier" });
  }
};

const getWareHouseByGeneral = async (req: Request, res: Response) => {
  const date = new Date();
  const previousMonth = new Date(date.setMonth(date.getMonth() - 1));

  try {
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $lookup: {
          from: "purchase_orders",
          localField: "_id",
          foreignField: "generalId",
          as: "purchase_orders",
        },
      },
      {
        $unwind: "$purchase_orders",
      },
      {
        $project: {
          _id: {
            general: "$purchase_orders.generalId",
            month: { $month: "$createdAt" },
          },

          quantity: {
            $sum: "$purchase_orders.products.inventory_number",
          },
          total_price: {
            $sum: "$purchase_orders.totalPrice",
          },
        },
      },
      {
        $group: {
          _id: "$_id.general",
          month: { $first: "$_id.month" },

          total_products: { $sum: "$quantity" },
          total_price: { $sum: "$total_price" },
        },
      },
    ];

    const results = await GeneralDepotModel.aggregate(pipeline);

    const enrichedResults = [];

    for (const result of results) {
      const warehouseId = result._id;

      const warehouse = await GeneralDepotModel.findById(warehouseId);

      if (warehouse) {
        const enrichedResult = {
          ...result,
          name: warehouse.name,
          type: warehouse.type,
        };

        enrichedResults.push(enrichedResult);
      }
    }

    res.status(200).json(enrichedResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching warehouse statistics" });
  }
};
export {
  createWareHouse,
  getWareHouseByProduct,
  getWareHouse,
  deleteWarehouse,
  getIncomeWarehouse,
  getWareHouseBySupplier,
  getWareHouseByGeneral,
  getInfoWareHouse,
  updateWarehouse,
};
