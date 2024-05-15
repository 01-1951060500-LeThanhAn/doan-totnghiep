import mongoose from "mongoose";

const ReceiptSchema = new mongoose.Schema(
  {
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

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
    },

    receipt_type: {
      type: String,
      enum: ["debt-customer", "receive-supplier"],
      default: "debt-customer",
    },
    payment_method: {
      type: String,
      enum: ["banking", "money"],
      default: "money",
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
  },
  {
    timestamps: true,
  }
);

ReceiptSchema.pre("find", async function (next) {
  this.populate({
    path: "customerId",
    select: "username code address phone ",
  });
  next();
});

ReceiptSchema.pre("find", async function (next) {
  this.populate({
    path: "staffId",
    select: "username  address phone ",
  });
  next();
});

ReceiptSchema.pre("find", async function (next) {
  this.populate({
    path: "orderId",
    select: "code payment_status",
  });
  next();
});

export default mongoose.model("receipt_orders", ReceiptSchema);
