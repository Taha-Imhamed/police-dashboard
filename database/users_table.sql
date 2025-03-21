CREATE TABLE users_table (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    rank VARCHAR(50),
    contact_info VARCHAR(100),
    status VARCHAR(20) DEFAULT 'off-duty',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);