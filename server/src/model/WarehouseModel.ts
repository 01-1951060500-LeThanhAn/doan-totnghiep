import mongoose from "mongoose";
const WarehouseSchema = new mongoose.Schema(
  {
    code: String,
    import_price: Number,
    totalPrice: Number,
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        inventory_number: {
          type: Number,
          required: true,
        },
      },
    ],
    generalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "general",
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },
    payment_status: {
      type: String,
      required: true,
      enum: ["delivered", "pending"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("purchase_orders", WarehouseSchema);
