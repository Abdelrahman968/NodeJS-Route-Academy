const express = require("express");
const {
  recordSale,
  getSales,
  getSalesByProductId,
  getTotalQuantitySold,
  getSalesReport,
} = require("../controllers/sales.controller");

const router = express.Router();

// api/sales
router.get("/", getSales);
router.post("/record", recordSale);
router.get("/reports", getSalesReport);
router.get("/reports/totalQuantitySold", getTotalQuantitySold);

router.get("/:productId", getSalesByProductId);

module.exports = router;
