import mongoose from "mongoose";

const ReceiptCustomerSchema = new mongoose.Schema(
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

    products: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "orders",
        },
        totalPrice: {
          type: Number,
          default: 0,
        },
      },
    ],

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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

ReceiptCustomerSchema.pre("find", async function (next) {
  this.populate({
    path: "customerId",
    select: "username code address phone ",
  });
  next();
});

ReceiptCustomerSchema.pre("find", async function (next) {
  this.populate({
    path: "staffId",
    select: "username  address phone ",
  });
  next();
});

ReceiptCustomerSchema.pre("find", async function (next) {
  this.populate({
    path: "orderId",
    select: "code payment_status",
  });
  next();
});

export default mongoose.model("receipt_orders", ReceiptCustomerSchema);
