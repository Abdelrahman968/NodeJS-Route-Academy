const pool = require("../config/db");

const getProducts = async (_, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM products");

    res.json({
      status: "success",
      products,
    });
  } catch (error) {
    console.error("Error Fetching Products:", error);
    res.status(500).json({
      status: "fail",
      message: error.sqlMessage,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { productName, price, stockQuantity } = req.body;

    const supplierID = req.user.sub;

    if (!productName || !price || !stockQuantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const [suppliers] = await pool.query(
      "SELECT * FROM suppliers WHERE supplierID = ?",
      [supplierID],
    );

    if (suppliers.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Supplier with ID {${supplierID}} does not exist.`,
      });
    }

    const [products] = await pool.query(
      "SELECT * FROM products WHERE productName = ?",
      [productName],
    );

    if (products.length >= 1) {
      return res.status(400).json({
        success: false,
        message: "Product already exists",
        data: products,
      });
    }

    const [result] = await pool.query(
      "INSERT INTO products (productName, price, stockQuantity, supplierID) VALUES (?, ?, ?, ?)",
      [productName, price, stockQuantity, supplierID],
    );

    const [product] = await pool.query(
      "SELECT * FROM products WHERE ProductID = ?",
      [result.insertId],
    );

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: product,
      database_result: result,
    });
  } catch (error) {
    console.error("Error Adding Product", error);
    res.status(500).json({
      status: "fail",
      message: error.sqlMessage,
    });
  }
};

const getProductsById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "Product ID is required",
      });
    }

    const [products] = await pool.query(
      "SELECT * FROM products WHERE ProductID = ?",
      [id],
    );

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: `Product with ID {${id}} not found`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { productName, price, stockQuantity } = req.body;

    if (!productName && !price && !stockQuantity) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide at least one field to update",
      });
    }

    const [product] = await pool.query(
      "SELECT * FROM products WHERE ProductID = ?",
      [id],
    );

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    const [result] = await pool.query(
      `UPDATE products
          SET ProductName = COALESCE(?, ProductName),
          Price = COALESCE(?, Price),
          StockQuantity = COALESCE(?, StockQuantity)
          WHERE ProductID = ?`,
      [productName ?? null, price ?? null, stockQuantity ?? null, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    const [updatedProduct] = await pool.query(
      "SELECT * FROM Products WHERE ProductID = ?",
      [id],
    );

    return res.status(200).json({
      status: "success",
      data: {
        updatedProduct: updatedProduct[0],
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Product ID is required",
      });
    }

    const [product] = await pool.query(
      "SELECT * FROM products WHERE ProductID = ?",
      [id],
    );

    if (product.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `Product with ID ${id} not found`,
      });
    }

    const [result] = await pool.query(
      "DELETE FROM Products WHERE ProductID = ?",
      [id],
    );

    return res.status(200).json({
      status: "success",
      message: `Product with ID ${id} deleted successfully`,
      product: product[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// ================================

const updateBreadPrice = async (_, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE Products
       SET Price = ?
       WHERE ProductName = ?`,
      [25.0, "Bread"],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Bread product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Bread price updated successfully",
    });
  } catch (error) {
    console.error("Error updating Bread price:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

const deleteEggs = async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM Products
       WHERE ProductName = ?`,
      ["Eggs"],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Eggs product not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Eggs deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Eggs:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

const getHighestStockProduct = async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT *
      FROM Products
      ORDER BY StockQuantity DESC
      LIMIT 1
    `);

    if (products.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No products found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: products[0],
    });
  } catch (error) {
    console.error("Error getting highest stock product:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

const getNeverSoldProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT p.*
      FROM Products p
      LEFT JOIN Sales s
        ON p.ProductID = s.ProductID
      WHERE s.ProductID IS NULL
    `);

    return res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.error("Error getting never sold products:", error);

    return res.status(500).json({
      status: "fail",
      message: error.sqlMessage || "Internal server error",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
  updateBreadPrice,
  deleteEggs,
  getHighestStockProduct,
  getNeverSoldProducts,
};
