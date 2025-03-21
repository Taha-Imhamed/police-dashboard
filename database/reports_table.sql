CREATE TABLE reports_table (
    id SERIAL PRIMARY KEY,
    case_id INT REFERENCES cases_table(id),
    report_data TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);