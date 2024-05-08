import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    total_products: Number,
    status: {
      type: String,
      enum: ["active", "passive"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("category", CategorySchema);
