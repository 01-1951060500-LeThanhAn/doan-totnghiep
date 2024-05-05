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
      type: Number,
      default: 0,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
      enum: ["admin", "manager"],
      required: true,
      unique: true,
    },
    generalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "general",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", UserSchema);
