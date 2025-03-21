CREATE TABLE weapons_table (
    id SERIAL PRIMARY KEY,
    serial_number VARCHAR(50) UNIQUE NOT NULL,
    owner_id INT REFERENCES citizens_table(id),
    status VARCHAR(20) DEFAULT 'registered',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);