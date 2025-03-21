CREATE TABLE health_monitor (
    id SERIAL PRIMARY KEY,
    officer_id INT REFERENCES users_table(id),
    heart_rate INT,
    movement BOOLEAN,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);