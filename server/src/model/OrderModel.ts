import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "partner",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    generalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "general",
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
      required: true,
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
    payment_method: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    note: {
      type: String,
      default: "",
    },
    total_ship: {
      type: Number,
      default: 0,
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

OrderSchema.pre("find", async function (next) {
  this.populate({
    path: "partnerId",
    select: "username phone address",
  });
  next();
});

OrderSchema.pre("find", async function (next) {
  this.populate({
    path: "customerId",
    select: "username createdAt",
  });
  next();
});

OrderSchema.pre("find", async function (next) {
  this.populate({
    path: "generalId",
    select: "name address createdAt code",
  });
  next();
});

export default mongoose.model("orders", OrderSchema);
