import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    partnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "partner",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    generalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "general",
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalReturnOrders: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
      required: true,
    },
    totalCustomerPay: {
      type: Number,
      default: 0,
      required: true,
    },
    totalQuantity: {
      type: Number,
      default: 0,
      required: true,
    },
    totalReturnOrders: {
      type: Number,
      default: 0,
      required: true,
    },
    code: {
      type: String,
    },
    delivery_address: {
      type: String,
    },
    invoice_address: {
      type: String,
    },

    payment_status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    received_date: {
      type: String,
      required: true,
    },
    order_status: {
      type: String,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
    },
    transport_status: {
      type: String,
      enum: ["transporting", "shipped"],
      default: "transporting",
    },
    payment_method: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    note: {
      type: String,
      default: "",
    },
    total_ship: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// OrderSchema.pre("save", async function (next) {
//   const order = this;
//   order.totalPrice = 0;
//   for (const product of order.products) {
//     const productDoc = await mongoose
//       .model("products")
//       .findById(product.productId);

//     if (!productDoc) {
//       console.warn(
//         `Product with ID ${product.productId} not found while calculating total price.`
//       );
//       continue;
//     }

//     order.totalPrice += productDoc.export_price * product.quantity;
//   }

//   next();
// });

OrderSchema.pre("save", async function (next) {
  const order = this;
  order.totalCustomerPay = 0;
  for (const product of order.products) {
    const productDoc = await mongoose
      .model("products")
      .findById(product.productId);

    if (!productDoc) {
      console.warn(
        `Product with ID ${product.productId} not found while calculating total price.`
      );
      continue;
    }

    order.totalCustomerPay += productDoc.export_price * product.quantity;
  }

  next();
});

OrderSchema.pre("find", async function (next) {
  this.populate({
    path: "partnerId",
    select: "username phone address",
  });
  next();
});

OrderSchema.pre("find", async function (next) {
  this.populate({
    path: "customerId",
    select: "username code address phone createdAt",
  });
  next();
});

OrderSchema.pre("find", async function (next) {
  this.populate({
    path: "generalId",
    select: "name address createdAt code",
  });
  next();
});

OrderSchema.pre("find", async function (next) {
  this.populate({
    path: "userId",
    select: "username code address phone",
  });
  next();
});

export default mongoose.model("orders", OrderSchema);
