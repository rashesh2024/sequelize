CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender ENUM('Male', 'Female', 'Other'),
    birth_date DATE,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    loyalty_points INT DEFAULT 0,
    account_status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description TEXT,
    parent_category_id INT,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);


CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0.00,
    stock_quantity INT DEFAULT 0,
    weight DECIMAL(6,2),
    dimensions VARCHAR(100),
    color VARCHAR(50),
    size VARCHAR(50),
    brand VARCHAR(100),
    category_id INT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);




CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    shipping_date DATETIME,
    delivery_date DATETIME,
    shipping_address TEXT,
    billing_address TEXT,
    status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled', 'Returned') DEFAULT 'Pending',
    total_amount DECIMAL(10,2),
    shipping_cost DECIMAL(10,2),
    tax_amount DECIMAL(10,2),
    payment_status ENUM('Paid', 'Unpaid', 'Refunded') DEFAULT 'Unpaid',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);


CREATE TABLE OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2),
    discount_applied DECIMAL(5,2) DEFAULT 0.00,
    total_price DECIMAL(10,2),
    is_returned BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);


CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10,2),
    currency VARCHAR(10) DEFAULT 'USD',
    payment_method ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Cash'),
    transaction_id VARCHAR(100),
    payment_status ENUM('Completed', 'Pending', 'Failed') DEFAULT 'Completed',
    processed_by VARCHAR(100),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);





CREATE TABLE Suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(100),
    contact_person VARCHAR(100),
    contact_email VARCHAR(100),
    phone VARCHAR(15),
    fax VARCHAR(20),
    address TEXT,
    website VARCHAR(255),
    tax_id VARCHAR(50),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    active BOOLEAN DEFAULT TRUE
);



CREATE TABLE ProductSuppliers (
    product_id INT,
    supplier_id INT,
    supply_price DECIMAL(10,2),
    available_quantity INT,
    supply_date DATE,
    expected_restock_date DATE,
    contract_id VARCHAR(100),
    PRIMARY KEY (product_id, supplier_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
);





CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_title VARCHAR(255),
    review_text TEXT,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    helpful_votes INT DEFAULT 0,
    status ENUM('Published', 'Pending', 'Rejected') DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);




CREATE TABLE Wishlists (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    priority_level ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    note TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

