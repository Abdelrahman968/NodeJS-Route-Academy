const express = require("express");

const {
  addCategory,
  removeCategory,
  changeContactNumber,
  makeProductNameNotNull,
} = require("../controllers/schema.controller");

const router = express.Router();

// api/schema
router.patch("/add-category", addCategory);
router.delete("/remove-category", removeCategory);
router.patch("/change-contact-number", changeContactNumber);
router.patch("/product-name-not-null", makeProductNameNotNull);

module.exports = router;
