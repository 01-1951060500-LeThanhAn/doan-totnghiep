import mongoose from "mongoose";

const ShippingWarehouseModel = new mongoose.Schema({
  fromGeneralId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "general",
    required: true,
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
        default: 0,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    },
  ],

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

export default mongoose.model("shipping_warehouse", ShippingWarehouseModel);
