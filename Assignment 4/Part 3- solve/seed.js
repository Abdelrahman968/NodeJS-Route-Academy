const pool = require("./src/config/db");

const seedDatabase = async () => {
  try {
    const [supplierResult] = await pool.query(
      `INSERT INTO Suppliers
       (SupplierName, ContactNumber)
       VALUES (?, ?)`,
      ["FreshFoods", "01001234567"],
    );

    const supplierID = supplierResult.insertId;

    console.log("Supplier created:", supplierID);

    const [milkResult] = await pool.query(
      `INSERT INTO Products
       (ProductName, Price, StockQuantity, SupplierID)
       VALUES (?, ?, ?, ?)`,
      ["Milk", 15.0, 50, supplierID],
    );

    await pool.query(
      `INSERT INTO Products
       (ProductName, Price, StockQuantity, SupplierID)
       VALUES (?, ?, ?, ?)`,
      ["Bread", 10.0, 30, supplierID],
    );

    await pool.query(
      `INSERT INTO Products
       (ProductName, Price, StockQuantity, SupplierID)
       VALUES (?, ?, ?, ?)`,
      ["Eggs", 20.0, 40, supplierID],
    );

    console.log("Products created");

    const milkID = milkResult.insertId;

    await pool.query(
      `INSERT INTO Sales
       (ProductID, QuantitySold, SaleDate)
       VALUES (?, ?, ?)`,
      [milkID, 2, "2026-08-22"],
    );

    console.log("Sale created");

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await pool.end();
  }
};

seedDatabase();
