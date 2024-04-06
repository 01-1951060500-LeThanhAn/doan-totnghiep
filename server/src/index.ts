import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./database/index";
import userRoutes from "./routes/userRoute";
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

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
