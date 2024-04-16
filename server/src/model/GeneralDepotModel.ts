import mongoose from "mongoose";
const generalDepotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["main", "sub"],
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: "",
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("general", generalDepotSchema);
