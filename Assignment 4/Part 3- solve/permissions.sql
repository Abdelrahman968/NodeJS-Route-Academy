
-- 14
-- Create store_manager and grant permissions

CREATE USER 'store_manager'@'localhost'
IDENTIFIED BY 'StoreManager@123';

GRANT SELECT, INSERT, UPDATE
ON store_db.*
TO 'store_manager'@'localhost';


-- 15
-- Revoke UPDATE permission

REVOKE UPDATE
ON store_db.*
FROM 'store_manager'@'localhost';


-- 16
-- Grant DELETE only on Sales

GRANT DELETE
ON store_db.Sales
TO 'store_manager'@'localhost';