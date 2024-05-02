import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    staffIncharge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    payer: {
      type: String,
      enum: ["customer", "shop"],
      default: "shop",
    },

    status: {
      type: String,
      enum: ["active", "passive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("partner", PartnerSchema);
