CREATE TABLE patrol_units (
    id SERIAL PRIMARY KEY,
    unit_name VARCHAR(50) NOT NULL,
    officer_ids INT[] REFERENCES users_table(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);