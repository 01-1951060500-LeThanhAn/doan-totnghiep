import mongoose from "mongoose";

const StockAdjustmentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    generalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "general",
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        inventory_number: {
          type: Number,
          required: true,
          default: 0,
        },
        inventory_discrepancy: {
          type: Number,
          default: 0,
        },
        reason: {
          type: String,
          required: true,
        },
      },
    ],
    desc: {
      type: String,
      required: true,
    },
    stocktaking_day: {
      type: String,
      required: true,
    },

    inventory_status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

StockAdjustmentSchema.pre("save", async function (next) {
  const stock = this;
  for (const product of stock.products) {
    const foundProductDoc = await mongoose
      .model("products")
      .findById(product.productId);

    if (!foundProductDoc) {
      console.warn(
        `Product with ID ${product.productId} not found while calculating total price.`
      );
      continue;
    }

    product.inventory_discrepancy =
      product.inventory_number - foundProductDoc.inventory_number;
  }

  next();
});

StockAdjustmentSchema.pre("find", async function (next) {
  this.populate({
    path: "products.productId",
    select: "name_product code  createdAt",
  });
  next();
});

StockAdjustmentSchema.pre("find", async function (next) {
  this.populate({
    path: "generalId",
    select: "name address createdAt code",
  });
  next();
});

StockAdjustmentSchema.pre("find", async function (next) {
  this.populate({
    path: "staffId",
    select: "username code address phone",
  });
  next();
});

export default mongoose.model("stock_adjustment", StockAdjustmentSchema);
