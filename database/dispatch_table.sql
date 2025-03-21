CREATE TABLE dispatch_table (
    id SERIAL PRIMARY KEY,
    officer_id INT REFERENCES users_table(id),
    task_description TEXT NOT NULL,
    location POINT,
    status VARCHAR(20) DEFAULT 'pending',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);