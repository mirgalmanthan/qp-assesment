-- Create users table first since it will be referenced by orders
CREATE TABLE users (
    "USER_ID" character varying(36) PRIMARY KEY,
    "USERNAME" character varying(100) NOT NULL,
    "EMAIL" character varying(100) NOT NULL,
    "PASSWORD" character varying(100) NOT NULL,
    "CREATED_AT" timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Create admin table
CREATE TABLE admin (
    "AID" bigint PRIMARY KEY,
    "USERNAME" character varying(50) NOT NULL,
    "PASSWORD" character varying(50) NOT NULL
);

-- Create products table before inventory and orders since they'll reference it
CREATE TABLE products (
    "PID" character varying(36) PRIMARY KEY,
    "PRODUCT_NAME" character varying(100) NOT NULL,
    "CATEGORY" character varying(100) NOT NULL,
    "DESCRIPTION" character varying(500),
    "PRICE" numeric NOT NULL,
    "IMAGE" character varying(1000)
);

-- Create inventory table with foreign key to products
CREATE TABLE inventory (
    "ID" bigint PRIMARY KEY,
    "PRODUCT_ID" character varying(36) NOT NULL,
    "QUANTITY" integer DEFAULT 0,
    "LAST_UPDATED" timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("PRODUCT_ID") REFERENCES products("PID")
);

-- Create orders table with foreign keys to both users and products
CREATE TABLE orders (
    "OID" bigint PRIMARY KEY,
    "USER_ID" character varying(36) NOT NULL,
    "PRODUCT_ID" character varying(36) NOT NULL,
    "ORDER_DATE" timestamp DEFAULT CURRENT_TIMESTAMP,
    "QUANTITY" integer DEFAULT 1,
    "STATUS" character varying(20) DEFAULT 'pending',
    FOREIGN KEY ("USER_ID") REFERENCES users("USER_ID"),
    FOREIGN KEY ("PRODUCT_ID") REFERENCES products("PID")
);

-- Add indexes for better query performance
CREATE INDEX idx_inventory_product ON inventory("PRODUCT_ID");
CREATE INDEX idx_orders_user ON orders("USER_ID");
CREATE INDEX idx_orders_product ON orders("PRODUCT_ID");
CREATE INDEX idx_products_category ON products("CATEGORY");

INSERT INTO admin("AID", "USERNAME", "PASSWORD") VALUES (1, 'admin', 'admin');