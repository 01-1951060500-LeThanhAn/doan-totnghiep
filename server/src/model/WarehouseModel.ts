import mongoose from "mongoose";
const WarehouseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    delivery_date: {
      type: String,
    },
    totalPrice: Number,
    totalQuantity: Number,
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
        import_price: {
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
      enum: ["delivered", "pending"],
      default: "pending",
    },
    order_status: {
      type: String,
      enum: ["entered", "not-entered"],
      default: "entered",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("purchase_orders", WarehouseSchema);
