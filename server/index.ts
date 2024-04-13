import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/database/index";
import userRoutes from "./src/routes/userRoute";
import supplierRoute from "./src/routes/supplierRoute";
import productRoute from "./src/routes/productRoute";
import wareHouseRoute from "./src/routes/warehouseRoute";
import orderRoute from "./src/routes/orderRoute";
import categoryRoute from "./src/routes/categoryRoute";
import orderImportRoute from "./src/routes/orderImportRoute";
import customerRoute from "./src/routes/customerRoute";
import partnerRoute from "./src/routes/partnerRoute";

dotenv.config();

db();

const app: Application = express();

app.use(express.json());
app.use(
  express.urlencoded({
    limit: "100mb",
  })
);
app.use(cors());
const port = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  res.json("Welcome to Express & TypeScript Server");
});

app.use("/users", userRoutes);
app.use("/supplier", supplierRoute);
app.use("/product", productRoute);
app.use("/warehouse", wareHouseRoute);
app.use("/orders", orderRoute);
app.use("/category", categoryRoute);
app.use("/customer", customerRoute);
app.use("/order-import", orderImportRoute);
app.use("/partner", partnerRoute);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
