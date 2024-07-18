import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    transaction_type: {
      type: String,
      required: true,
      enum: ["import", "export", "order"],
    },
    transaction_date: { type: Date, required: true, default: Date.now },
    totalPrice: { type: Number, required: true, default: 0 },
    orderId: { type: mongoose.Types.ObjectId, ref: "orders" },
    shipId: { type: mongoose.Types.ObjectId, ref: "shipping_warehouse" },
    warehouseId: { type: mongoose.Types.ObjectId, ref: "good_received_notes" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("transactions", TransactionSchema);
