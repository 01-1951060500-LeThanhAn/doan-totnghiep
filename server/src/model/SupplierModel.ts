import mongoose from "mongoose";
import isEmail from "validator";

const SupplierSchema = new mongoose.Schema({
  supplier_name: {
    type: String,
    required: true,
  },
  supplier_type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email_supplier: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => isEmail,
      msg: "Email error",
    },
  },
  website: {
    type: String,
    required: true,
  },
});

export default mongoose.model("supplier", SupplierSchema);
