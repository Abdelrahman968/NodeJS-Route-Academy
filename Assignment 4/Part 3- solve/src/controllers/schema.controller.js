const pool = require("../config/db");

const addCategory = async (_, res) => {
  try {
    await pool.query(`
      ALTER TABLE Products
      ADD COLUMN Category VARCHAR(100)
    `);

    return res.status(200).json({
      status: "success",
      message: "Category column added successfully",
    });
  } catch (error) {
    console.error("Add Category Error:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

const removeCategory = async (_, res) => {
  try {
    await pool.query(`
      ALTER TABLE Products
      DROP COLUMN Category
    `);

    return res.status(200).json({
      status: "success",
      message: "Category column removed successfully",
    });
  } catch (error) {
    console.error("Remove Category Error:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

const changeContactNumber = async (_, res) => {
  try {
    await pool.query(`
      ALTER TABLE Suppliers
      MODIFY COLUMN ContactNumber VARCHAR(15)
    `);

    return res.status(200).json({
      status: "success",
      message: "ContactNumber changed to VARCHAR(15)",
    });
  } catch (error) {
    console.error("Change ContactNumber Error:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

const makeProductNameNotNull = async (_, res) => {
  try {
    await pool.query(`
      ALTER TABLE Products
      MODIFY COLUMN ProductName VARCHAR(100) NOT NULL
    `);

    return res.status(200).json({
      status: "success",
      message: "ProductName is now NOT NULL",
    });
  } catch (error) {
    console.error("ProductName NOT NULL Error:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

module.exports = {
  addCategory,
  removeCategory,
  changeContactNumber,
  makeProductNameNotNull,
};
