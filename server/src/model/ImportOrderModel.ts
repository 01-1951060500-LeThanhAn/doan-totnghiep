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
        import_price: {
          type: Number,
          required: true,
        },
      },
    ],
    total_price: {
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
    path: "generalId",
    select: "name",
  });
  next();
});

export default mongoose.model("order_suppliers", OrderPurchaseSchema);
