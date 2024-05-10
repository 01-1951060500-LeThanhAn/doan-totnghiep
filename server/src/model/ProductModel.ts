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
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
      type: String,
      required: true,
    },
    export_price: {
      type: String,
      required: true,
    },
    inventory_number: {
      type: Number,
      required: true,
      default: 0,
      ref: "purchase_orders",
    },
    pendingOrderQuantity: {
      required: true,
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["stocking", "out-of-stock"],
      default: "stocking",
    },
    img: {
      type: String,
    },

    desc: {
      type: String,
    },
    transactionHistory: {
      type: [
        {
          orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders",
          },
          generalId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "generals",
          },
          staffId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: {
            type: Number,
            required: true,
          },
          inventory_number: {
            type: Number,
            required: true,
          },
          transactionType: {
            type: String,
            enum: ["order", "adjustment"],
            default: "order",
          },
          transactionDate: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
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

ProductSchema.pre("find", async function (next) {
  this.populate({
    path: "manager",
    select: "username email phone address picture role",
  });
  next();
});

ProductSchema.pre("find", async function (next) {
  this.populate({
    path: "generalId",
    select: "name type phone address manager",
  });
  next();
});

export default mongoose.model("products", ProductSchema);
