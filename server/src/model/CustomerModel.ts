import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String },
    district: { type: String },
    ward: { type: String },
    specific_address: { type: String },
    level: { type: String, default: "" },
    phone: { type: String },
    email: { type: String, default: "" },
    birth: { type: String, default: "" },
    tax_code: { type: String },
    website: { type: String },
    note: { type: String },
    opening_balance: {
      type: String,
      default: "",
    },
    balance_increases: {
      type: String,
      default: "",
    },
    balance_decreases: {
      type: String,
      default: "",
    },
    remaining_decreases: {
      type: String,
      default: "",
    },
    ending_balance: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("customer", CustomerSchema);
