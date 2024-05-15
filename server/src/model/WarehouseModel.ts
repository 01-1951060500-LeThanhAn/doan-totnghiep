import mongoose from "mongoose";
const WarehouseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    delivery_date: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalSupplierPay: {
      type: Number,
      default: 0,
      required: true,
    },
    totalQuantity: Number,
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        inventory_number: {
          type: Number,
          required: true,
        },
      },
    ],
    generalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "general",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },
    payment_status: {
      type: String,
      enum: ["delivered", "pending"],
      default: "pending",
    },
    order_status: {
      type: String,
      enum: ["entered", "not-entered"],
      default: "entered",
    },
  },
  {
    timestamps: true,
  }
);

WarehouseSchema.pre("save", async function (next) {
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

    order.totalPrice += productDoc.export_price * product.inventory_number;
  }

  next();
});

WarehouseSchema.pre("save", async function (next) {
  const order = this;
  order.totalSupplierPay = 0;
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

    order.totalSupplierPay +=
      productDoc.export_price * product.inventory_number;
  }

  next();
});
export default mongoose.model("purchase_orders", WarehouseSchema);
