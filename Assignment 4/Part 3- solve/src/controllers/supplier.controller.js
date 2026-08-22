const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const getSuppliers = async (_, res) => {
  try {
    const [suppliers] = await pool.query("SELECT * FROM suppliers");

    res.status(200).json({
      status: "success",
      massage: "Successfully Fetched Suppliers",
      data: suppliers,
    });
  } catch (error) {
    console.error("Error Fetching Suppliers:", error);
    res.status(500).json({
      status: "fail",
      message: error.sqlMessage,
    });
  }
};

const registerSupplier = async (req, res) => {
  try {
    const { supplierName, contactNumber } = req.body;

    if (!supplierName) {
      return res.status(400).json({
        status: "fail",
        message:
          "Please provide at least supplierName, contactNumber is optional",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO suppliers (SupplierName, ContactNumber) VALUES (?, ?)",
      [supplierName, contactNumber],
    );

    const token = jwt.sign(
      {
        sub: result.insertId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      },
    );

    res.cookie("supplierToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.status(201).json({
      status: "success",
      message: "Supplier created successfully",
      data: {
        SupplierID: result.insertId,
        SupplierName: supplierName,
        ContactNumber: contactNumber,
      },
    });
  } catch (error) {
    console.error("Register supplier error:", error);

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const loginSupplier = async (req, res) => {
  try {
    const { supplierName, contactNumber } = req.body;

    if (!supplierName || !contactNumber) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields - supplierName and contactNumber",
      });
    }

    const [result] = await pool.query(
      "SELECT * FROM suppliers WHERE supplierName = ? AND contactNumber = ?",
      [supplierName, contactNumber],
    );

    if (result.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Supplier not found",
      });
    }

    const token = jwt.sign(
      {
        sub: result[0].SupplierID,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      },
    );

    res.cookie("supplierToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      status: "success",
      database_result: result,
      token,
    });
  } catch (error) {
    console.error("Error Login Suppliers:", error);

    res.status(500).json({
      status: "fail",
      message: error.sqlMessage,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const [suppliers] = await pool.query(
      "SELECT * FROM suppliers WHERE SupplierID = ?",
      [req.user.sub],
    );

    if (suppliers.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Suppliers not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Supplier found",
      data: suppliers[0],
    });
  } catch (error) {
    console.log(req.user);

    res.status(500).json({
      status: "fail",
      message: error.sqlMessage,
    });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplierId = req.user.sub;

    const { supplierName, contactNumber } = req.body;

    if (!supplierName && !contactNumber) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide at least one field to update",
      });
    }

    const [result] = await pool.query(
      `UPDATE suppliers
            SET SupplierName = COALESCE(?, SupplierName),
            ContactNumber = ?
            WHERE SupplierID = ?`,
      [supplierName ?? null, contactNumber ?? null, supplierId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Supplier not found",
      });
    }

    const [suppliers] = await pool.query(
      `SELECT SupplierID, SupplierName, ContactNumber
       FROM suppliers
       WHERE SupplierID = ?`,
      [supplierId],
    );

    res.status(200).json({
      status: "success",
      message: "Supplier information updated successfully",
      data: suppliers[0],
    });
  } catch (error) {
    console.error("Update Supplier Error:", error);

    res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const supplierId = req.user.sub;

    if (!supplierId) {
      return res.status(400).json({
        status: "fail",
        message: "Supplier ID is required, pls Login as a Supplier first",
      });
    }

    const [result] = await pool.query(
      "DELETE FROM suppliers WHERE SupplierID = ?",
      [supplierId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    console.error("Delete Supplier Error:", error);

    res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

// ================

const getSuppliersStartingWithF = async (req, res) => {
  try {
    const [suppliers] = await pool.query(`
      SELECT *
      FROM Suppliers
      WHERE SupplierName LIKE 'F%'
    `);

    return res.status(200).json({
      status: "success",
      data: suppliers,
    });
  } catch (error) {
    console.error("Error getting suppliers:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

module.exports = {
  getSuppliers,
  registerSupplier,
  loginSupplier,
  getMe,
  updateSupplier,
  deleteSupplier,
  getSuppliersStartingWithF,
};
