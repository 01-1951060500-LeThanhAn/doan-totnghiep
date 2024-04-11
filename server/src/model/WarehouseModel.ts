import mongoose from "mongoose";
const WarehouseSchema = new mongoose.Schema(
  {
    inventory_number: Number,
    import_price: Number,
    totalPrice: Number,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },
    payment_status: {
      type: String,
      required: true,
      enum: ["delivered", "pending"],
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order_suppliers",
    },
  },
  {
    timestamps: true,
  }
);

WarehouseSchema.pre("find", async function (next) {
  this.populate({
    path: "productId",
    select: "name_product code import_price img",
  });
  next();
});

export default mongoose.model("purchase_orders", WarehouseSchema);
