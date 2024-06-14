import mongoose from "mongoose";
const generalDepotSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
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
      required: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// generalDepotSchema.virtual("ProductSchema", {
//   ref: "products",
//   localField: "products",
//   foreignField: "_id",
//   justOne: true,
// });

// generalDepotSchema.virtual("ShippingWarehouseModel", {
//   ref: "shipping_warehouse",
//   localField: "products",
//   foreignField: "generalId",
//   justOne: true,
// });

export default mongoose.model("general", generalDepotSchema);
