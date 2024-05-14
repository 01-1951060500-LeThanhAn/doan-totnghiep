"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./src/database/index"));
const userRoute_1 = __importDefault(require("./src/routes/userRoute"));
const supplierRoute_1 = __importDefault(require("./src/routes/supplierRoute"));
const productRoute_1 = __importDefault(require("./src/routes/productRoute"));
const warehouseRoute_1 = __importDefault(require("./src/routes/warehouseRoute"));
const orderRoute_1 = __importDefault(require("./src/routes/orderRoute"));
const categoryRoute_1 = __importDefault(require("./src/routes/categoryRoute"));
const orderImportRoute_1 = __importDefault(require("./src/routes/orderImportRoute"));
const customerRoute_1 = __importDefault(require("./src/routes/customerRoute"));
const partnerRoute_1 = __importDefault(require("./src/routes/partnerRoute"));
const roleRoute_1 = __importDefault(require("./src/routes/roleRoute"));
const generalRoute_1 = __importDefault(require("./src/routes/generalRoute"));
const shippingRoute_1 = __importDefault(require("./src/routes/shippingRoute"));
const transactionRoute_1 = __importDefault(require("./src/routes/transactionRoute"));
const returnOrderRoute_1 = __importDefault(require("./src/routes/returnOrderRoute"));
const receiptRoute_1 = __importDefault(require("./src/routes/receiptRoute"));
dotenv_1.default.config();
(0, index_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    limit: "100mb",
}));
app.use((0, cors_1.default)());
const port = process.env.PORT || 8000;
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("Welcome to Express & TypeScript Server");
}));
app.use("/users", userRoute_1.default);
app.use("/supplier", supplierRoute_1.default);
app.use("/product", productRoute_1.default);
app.use("/warehouse", warehouseRoute_1.default);
app.use("/orders", orderRoute_1.default);
app.use("/category", categoryRoute_1.default);
app.use("/customer", customerRoute_1.default);
app.use("/order-import", orderImportRoute_1.default);
app.use("/partner", partnerRoute_1.default);
app.use("/roles", roleRoute_1.default);
app.use("/general", generalRoute_1.default);
app.use("/transactions", transactionRoute_1.default);
app.use("/ship", shippingRoute_1.default);
app.use("/return-order", returnOrderRoute_1.default);
app.use("/receipt-order", receiptRoute_1.default);
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
