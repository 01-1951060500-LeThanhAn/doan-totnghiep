import mongoose from "mongoose";

const ShippingWarehouseModel = new mongoose.Schema({
  code: {
    type: String,
  },
  fromGeneralId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "general",
    required: true,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  toGeneralId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "general",
    required: true,
  },
  products: [
    {
      inventory_number: {
        type: Number,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    },
  ],
  totalPrice: Number,
  totalQuantity: Number,

  transferDate: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "inTransit", "completed", "failed"],
    default: "pending",
  },
});

ShippingWarehouseModel.pre("find", async function (next) {
  this.populate({
    path: "toGeneralId",
    select: "address name type ",
  });
  next();
});

ShippingWarehouseModel.pre("find", async function (next) {
  this.populate({
    path: "fromGeneralId",
    select: "address name type ",
  });
  next();
});

ShippingWarehouseModel.pre("save", async function (next) {
  const order = this;
  order.totalPrice = 0;
  for (const product of order.products) {
    const productDoc = await mongoose
      .model("products")
      .findById(product.productId);

    if (!productDoc) {
      console.warn(
        `Product with ID ${product.productId} not found while calculating total price.`
      );
      continue;
    }

    order.totalPrice += productDoc.export_price * product.inventory_number;
  }

  next();
});

export default mongoose.model("shipping_warehouse", ShippingWarehouseModel);
