CREATE TABLE inventory_table (
    id SERIAL PRIMARY KEY,
    gear_type VARCHAR(50) NOT NULL,
    officer_id INT REFERENCES users_table(id),
    status VARCHAR(20) DEFAULT 'available',
    issued_at TIMESTAMP,
    returned_at TIMESTAMP
);