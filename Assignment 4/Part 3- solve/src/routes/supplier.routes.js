const express = require("express");
const {
  getSuppliers,
  registerSupplier,
  loginSupplier,
  getMe,
  updateSupplier,
  deleteSupplier,
  getSuppliersStartingWithF,
} = require("../controllers/supplier.controller");
const authMiddleware = require("../../middleware/auth.middleware");

const router = express.Router();

// api/suppliers
router.get("/", getSuppliers);
router.post("/register", registerSupplier);
router.post("/login", loginSupplier);
router.get("/getMe", authMiddleware, getMe);
router.patch("/update", authMiddleware, updateSupplier);
router.delete("/delete", authMiddleware, deleteSupplier);

router.get("/reports/startsWithF", getSuppliersStartingWithF);

module.exports = router;
