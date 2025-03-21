CREATE TABLE cctv_logs (
    id SERIAL PRIMARY KEY,
    camera_id INT NOT NULL,
    feed_url TEXT,
    incident_id INT REFERENCES cases_table(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);