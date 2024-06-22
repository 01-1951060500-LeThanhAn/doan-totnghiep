import mongoose from "mongoose";

const ReturnOrderSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "orders",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "customer",
    },

    generalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "general",
    },

    return_reason: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalReturnQuantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },

    status: {
      type: String,
      default: "received",
      enum: ["received", "not-received"],
    },
    refund_status: {
      type: String,
      default: "not-refund",
      enum: ["refunded", "not-refund"],
    },
  },
  {
    timestamps: true,
  }
);

ReturnOrderSchema.pre("save", async function (next) {
  const order = this;
  order.totalPrice = 0;
  for (const product of order.products) {
    const productDoc = await mongoose
      .model("products")
      .findById(product.productId);

    if (!productDoc) {
      console.warn(
        `Product with ID ${product.productId} not found while calculating total price.`
      );
      continue;
    }

    order.totalPrice += productDoc.export_price * product.quantity;
  }

  next();
});

ReturnOrderSchema.pre("find", async function (next) {
  this.populate({
    path: "customerId",
    select: "username code address phone",
  });
  next();
});

ReturnOrderSchema.pre("find", async function (next) {
  this.populate({
    path: "generalId",
    select: "name address  code",
  });
  next();
});

ReturnOrderSchema.pre("find", async function (next) {
  this.populate({
    path: "orderId",
    select: "code",
  });
  next();
});

export default mongoose.model("return_orders", ReturnOrderSchema);
