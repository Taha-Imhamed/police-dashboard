CREATE TABLE error_logs (
    id SERIAL PRIMARY KEY,
    module_name VARCHAR(50),
    error_message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);