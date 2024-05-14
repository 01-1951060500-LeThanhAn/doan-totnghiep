import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  submitter: {
    type: String,
    enum: ["customer", "supplier"],
    default: "customer",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },

  receipt_type: {
    type: String,
    enum: ["debt-customer", "receive-supplier"],
    default: "debt-customer",
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  payment_status: {
    type: String,
    enum: ["unpaid", "paid"],
    default: "paid",
  },
  desc: {
    type: String,
  },
});
export default mongoose.model("receipt_orders", ReceiptSchema);
