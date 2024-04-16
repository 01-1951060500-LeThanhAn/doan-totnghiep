import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name_product: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    generalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "general",
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },

    unit: {
      type: String,
      enum: ["m", "box"],
      required: true,
    },
    import_price: {
      type: Number,
      required: true,
    },
    export_price: {
      type: Number,
      required: true,
    },
    inventory_number: {
      type: Number,
      required: true,
      default: 0,
      ref: "purchase_orders",
    },
    status: {
      type: String,
      required: true,
      enum: ["stocking", "out of stock"],
      default: "stocking",
    },
    img: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre("find", async function (next) {
  this.populate({
    path: "type",
    select: "name",
  });
  next();
});

export default mongoose.model("products", ProductSchema);
