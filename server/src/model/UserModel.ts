import mongoose from "mongoose";
import isEmail from "validator";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => value.length > 3,
        msg: "Username error",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => isEmail,
        msg: "Email error",
      },
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    picture: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["manager", "admin"],
      default: "admin",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", UserSchema);
