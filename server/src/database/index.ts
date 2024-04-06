import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DATA_MONGO = process.env.DATA_MONGO as string;
async function connect() {
  try {
    await mongoose.connect(DATA_MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

export default connect;
