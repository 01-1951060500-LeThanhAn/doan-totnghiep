import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  material_name: {
    type: String,
    required: true,
  },
  material_code: {
    type: String,
    required: true,
  },
  material_type: {
    type: String,
    required: true,
  },

  unit: {
    type: String,
    enum: ["m", "kg"],
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
  },
  status: {
    type: String,
    required: true,
    enum: ["stocking", "out of stock"],
  },
  image: {
    type: String,
    required: true,
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  desc: {
    type: String,
    required: true,
  },
});

export default mongoose.model("products", ProductSchema);
