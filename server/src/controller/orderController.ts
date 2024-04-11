import { Request, Response } from "express";
import OrderModel from "../model/OrderModel";
import CustomerModel from "../model/CustomerModel";
import ProductModel from "../model/ProductModel";

const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.body.customerId;

    if (!customerId) {
      return res.status(400).json({ message: "customerId is required" });
    }

    const customer = await CustomerModel.findById(customerId);

    if (!customer) {
      return res.status(400).json({ message: "customerId not found" });
    }

    const newOrder = new OrderModel({
      ...req.body,
      customerId: customer._id,
      payment_status: "unpaid",
    });

    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const carts = await OrderModel.find().populate("customerId products");
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  const cartId = req.params.id;

  if (!cartId) {
    return res.status(400).json({
      message: "Lỗi khi cập nhật giỏ hàng",
    });
  }

  try {
    const originalOrder = await OrderModel.findById(cartId);

    const updatedOrder = await OrderModel.findByIdAndUpdate(cartId, req.body, {
      new: true,
    });

    const paymentStatusChangedToPaid =
      originalOrder?.payment_status !== "paid" &&
      updatedOrder?.payment_status === "paid";

    if (paymentStatusChangedToPaid) {
      let insufficientStock = false;

      for (const product of updatedOrder.products) {
        const foundProduct = await ProductModel.findById(product.productId);

        if (foundProduct && foundProduct.inventory_number >= product.quantity) {
          foundProduct.inventory_number -= product.quantity;
          await foundProduct.save();
        } else {
          insufficientStock = true;
          console.error(
            "Lỗi: Sản phẩm",
            product.productId,
            "không đủ hàng trong kho"
          );
        }
      }

      if (insufficientStock) {
        return res
          .status(400)
          .json({ message: "Lỗi: Không đủ số lượng sản phẩm trong kho" });
      }
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const cartId = req.params.id;

  if (!cartId) {
    return res.status(400).json({
      message: "Lỗi khi xóa giỏ hàng",
    });
  }
  try {
    await OrderModel.findByIdAndDelete(cartId);
    res.status(200).json("Sản phẩm đã được xóa khỏi giỏ hàng.");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getDetailOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const order = await OrderModel.findById(orderId)
      .populate("customerId products.productId")
      .select("");
    if (!order) {
      return res.status(400).json({ message: "orderId not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// const processPayment = async (req: Request, res: Response) => {
//   const { products } = req.body;

//   const itemPayment = products.map((item: any) => {
//     return {
//       price_data: {
//         currency: "usd",
//         productId: item.productId,
//         quantity: item.quantity,
//       },

//       customer: req.body.customerId,
//     };
//   });

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: itemPayment,
//     mode: "payment",
//     success_url: `${req.protocol}://${req.get("host")}/success`,
//     cancel_url: `${req.protocol}://${req.get("host")}/cancel`,
//   });

//   res.json({ id: session.id });
// };

export { createOrder, getAllOrder, updateOrder, deleteOrder, getDetailOrder };
