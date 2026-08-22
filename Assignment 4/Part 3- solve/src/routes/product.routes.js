const express = require("express");
const {
  getProducts,
  createProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
  updateBreadPrice,
  deleteEggs,
  getHighestStockProduct,
  getNeverSoldProducts,
} = require("../controllers/product.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

// api/products
router.get("/", getProducts);
router.post("/create", authMiddleware, createProduct);
router.patch("/updateBreadPrice", updateBreadPrice);
router.delete("/deleteEggs", deleteEggs);
router.get("/reports/highestStock", getHighestStockProduct);
router.get("/reports/neverSold", getNeverSoldProducts);

router.delete("/delete/:id", deleteProduct);
router.patch("/update/:id", updateProduct);
router.get("/:id", getProductsById);

module.exports = router;
