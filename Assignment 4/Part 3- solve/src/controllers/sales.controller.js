const pool = require("../config/db");

const recordSale = async (req, res) => {
  try {
    const { productID, quantitySold, saleDate } = req.body;

    if (productID === undefined || quantitySold === undefined || !saleDate) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields",
      });
    }

    const [products] = await pool.query(
      "SELECT * FROM Products WHERE ProductID = ?",
      [productID],
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Product with ID ${productID} not found`,
      });
    }

    const product = products[0];

    if (product.StockQuantity < quantitySold) {
      return res.status(400).json({
        status: "fail",
        message: "Insufficient stock",
        availableStock: product.StockQuantity,
      });
    }

    const [result] = await pool.query(
      `INSERT INTO Sales
       (ProductID, QuantitySold, SaleDate)
       VALUES (?, ?, ?)`,
      [productID, quantitySold, saleDate],
    );

    await pool.query(
      `UPDATE Products
       SET StockQuantity = StockQuantity - ?
       WHERE ProductID = ?`,
      [quantitySold, productID],
    );

    const [sale] = await pool.query("SELECT * FROM Sales WHERE SaleID = ?", [
      result.insertId,
    ]);

    return res.status(201).json({
      status: "success",
      message: "Sale recorded successfully",
      data: sale[0],
    });
  } catch (error) {
    console.error("Error in recordSale:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

const getSales = async (_, res) => {
  try {
    const [sales] = await pool.query("SELECT * FROM Sales");

    res.json({
      status: "success",
      sales,
    });
  } catch (error) {
    console.error("Error Fetching Sales:", error);
    res.status(500).json({
      status: "fail",
      message: error.sqlMessage,
    });
  }
};

const getSalesByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;

    if (!productId) {
      return res.status(400).json({
        status: "fail",
        message: "Product ID is required",
      });
    }

    const [products] = await pool.query(
      "SELECT * FROM Products WHERE ProductID = ?",
      [productId],
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Product with ID ${productId} not found`,
      });
    }

    const [result] = await pool.query(
      "SELECT * FROM Sales WHERE ProductID = ?",
      [productId],
    );

    if (result.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Sales for product with ID ${productId} not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        sales: result,
      },
    });
  } catch (error) {
    console.error("Error in getSalesByProductId:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

// ==========================

const getTotalQuantitySold = async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT
        p.ProductID,
        p.ProductName,
        COALESCE(SUM(s.QuantitySold), 0) AS TotalQuantitySold
      FROM Products p
      LEFT JOIN Sales s
        ON p.ProductID = s.ProductID
      GROUP BY
        p.ProductID,
        p.ProductName
      ORDER BY p.ProductID
    `);

    return res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error("Error getting total quantity sold:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};


const getSalesReport = async (req, res) => {
  try {
    const [sales] = await pool.query(`
      SELECT
        p.ProductName,
        s.QuantitySold,
        s.SaleDate
      FROM Sales s
      INNER JOIN Products p
        ON s.ProductID = p.ProductID
    `);

    return res.status(200).json({
      status: "success",
      data: sales,
    });
  } catch (error) {
    console.error("Error fetching sales report:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

module.exports = {
  recordSale,
  getSales,
  getSalesByProductId,
  getTotalQuantitySold,
  getSalesReport,
};
