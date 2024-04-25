import mongoose from "mongoose";
import isEmail from "validator";

const SupplierSchema = new mongoose.Schema(
  {
    supplier_name: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    supplier_code: {
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
    address_supplier: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    tax_code: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("supplier", SupplierSchema);
