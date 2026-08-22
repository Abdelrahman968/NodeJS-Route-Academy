const express = require("express");
const cookieParser = require("cookie-parser");

const saleRoutes = require("./src/routes/sale.routes");
const schemaRoutes = require("./src/routes/schema.routes");
const productRoutes = require("./src/routes/product.routes");
const supplierRoutes = require("./src/routes/supplier.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/sales", saleRoutes);
app.use("/api/schema", schemaRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);

module.exports = app;
