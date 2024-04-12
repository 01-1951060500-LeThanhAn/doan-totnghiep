import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    username: {
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

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("partner", PartnerSchema);
