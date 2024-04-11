import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total_price: {
      type: Number,
      default: 0,
    },
    code: {
      type: String,
    },
    payment_status: {
      type: String,

      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    received_date: {
      type: String,
      required: true,
    },
    order_status: {
      type: String,

      enum: ["pending", "delivered", "shipped"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("save", async function (next) {
  const order = this;
  order.total_price = 0;
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

    order.total_price += productDoc.import_price * product.quantity;
  }

  next();
});

export default mongoose.model("orders", OrderSchema);
