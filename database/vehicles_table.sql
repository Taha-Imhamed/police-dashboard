CREATE TABLE vehicles_table (
    id SERIAL PRIMARY KEY,
    plate_number VARCHAR(20) UNIQUE NOT NULL,
    owner_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'registered',
    flagged_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);