import mongoose from "mongoose";
const OrderPurchaseSchema = new mongoose.Schema(
  {
    code: {
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
        inventory_number: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
    totalQuantity: {
      type: Number,
    },
    order_status: {
      type: String,
      default: "not-entered",
      enum: ["entered", "not-entered"],
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    generalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "general",
    },
    payment_status: {
      type: String,
      enum: ["delivered", "pending"],
      default: "pending",
    },

    received_date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

OrderPurchaseSchema.pre("find", async function (next) {
  this.populate({
    path: "products.productId",
    select: "name_product code import_price img",
  });
  next();
});

OrderPurchaseSchema.pre("find", async function (next) {
  this.populate({
    path: "supplierId",
    select: "supplier_name supplier_code address_supplier",
  });
  next();
});

OrderPurchaseSchema.pre("find", async function (next) {
  this.populate({
    path: "staffId",
    select: "username code",
  });
  next();
});

OrderPurchaseSchema.pre("find", async function (next) {
  this.populate({
    path: "generalId",
    select: "name",
  });
  next();
});

OrderPurchaseSchema.pre("save", async function (next) {
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

    order.totalPrice += productDoc.import_price * product.inventory_number;
  }

  next();
});

export default mongoose.model("purchase_orders", OrderPurchaseSchema);
