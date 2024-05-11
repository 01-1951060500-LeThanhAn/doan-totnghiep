import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    specific_address: { type: String, required: true },
    level: { type: String, default: "" },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    birth: { type: String, default: "" },
    tax_code: { type: String, required: true },
    website: { type: String },
    note: { type: String },
    opening_balance: {
      type: Number,
      default: 0,
    },
    balance_increases: {
      type: Number,
      default: 0,
    },
    balance_decreases: {
      type: Number,
      default: 0,
    },
    remaining_decreases: {
      type: Number,
      default: 0,
    },
    ending_balance: {
      type: Number,
      default: 0,
    },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("customer", CustomerSchema);
