import mongoose from "mongoose";

const ReceiptSupplierSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    submitter: {
      type: String,
      enum: ["customer", "supplier"],
      default: "supplier",
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    products: [
      {
        warehouseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "purchase_orders",
          required: true,
        },
        totalPrice: {
          type: Number,
          default: 0,
          required: true,
        },
      },
    ],

    receipt_type: {
      type: String,
      enum: ["debt-customer", "receive-supplier"],
      default: "receive-supplier",
    },
    payment_method: {
      type: String,
      enum: ["banking", "money"],
      default: "money",
    },

    payment_status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "paid",
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ReceiptSupplierSchema.pre("find", async function (next) {
  this.populate({
    path: "supplierId",
    select: "supplier_name supplier_code email_supplier address_supplier",
  });
  next();
});

ReceiptSupplierSchema.pre("find", async function (next) {
  this.populate({
    path: "staffId",
    select: "username  address phone ",
  });
  next();
});

ReceiptSupplierSchema.pre("find", async function (next) {
  this.populate({
    path: "warehouseId",
    select: "code payment_status",
  });
  next();
});

export default mongoose.model("receipt_suppliers", ReceiptSupplierSchema);
