-- Create the main database
CREATE DATABASE police_dashboard;

-- Switch to the database
\c police_dashboard;

-- 1. Users Table: Stores officers and personnel records
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

-- 2. Cases Table: Stores active and closed police cases
CREATE TABLE cases_table (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    officer_id INT REFERENCES users_table(id),
    status VARCHAR(20) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Dispatch Table: Tracks dispatch assignments and history
CREATE TABLE dispatch_table (
    id SERIAL PRIMARY KEY,
    officer_id INT REFERENCES users_table(id),
    task_description TEXT NOT NULL,
    location POINT,
    status VARCHAR(20) DEFAULT 'pending',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- 4. Vehicles Table: Stores registered vehicles and their case links
CREATE TABLE vehicles_table (
    id SERIAL PRIMARY KEY,
    plate_number VARCHAR(20) UNIQUE NOT NULL,
    owner_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'registered',
    flagged_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Citizens Table: Stores citizen details and criminal history
CREATE TABLE citizens_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dob DATE,
    address TEXT,
    criminal_record TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Weapons Table: Stores registered and illegal firearm records
CREATE TABLE weapons_table (
    id SERIAL PRIMARY KEY,
    serial_number VARCHAR(50) UNIQUE NOT NULL,
    owner_id INT REFERENCES citizens_table(id),
    status VARCHAR(20) DEFAULT 'registered',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Inventory Table: Tracks police weapons and gear
CREATE TABLE inventory_table (
    id SERIAL PRIMARY KEY,
    gear_type VARCHAR(50) NOT NULL,
    officer_id INT REFERENCES users_table(id),
    status VARCHAR(20) DEFAULT 'available',
    issued_at TIMESTAMP,
    returned_at TIMESTAMP
);

-- 8. CCTV Logs Table: Stores metadata for video evidence
CREATE TABLE cctv_logs (
    id SERIAL PRIMARY KEY,
    camera_id INT NOT NULL,
    feed_url TEXT,
    incident_id INT REFERENCES cases_table(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Reports Table: Stores case-related documents and reports
CREATE TABLE reports_table (
    id SERIAL PRIMARY KEY,
    case_id INT REFERENCES cases_table(id),
    report_data TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 10. Patrol Units Table: Stores patrol group information
CREATE TABLE patrol_units (
    id SERIAL PRIMARY KEY,
    unit_name VARCHAR(50) NOT NULL,
    officer_ids INT[] REFERENCES users_table(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Health Monitor Table: Stores smartwatch health tracking data
CREATE TABLE health_monitor (
    id SERIAL PRIMARY KEY,
    officer_id INT REFERENCES users_table(id),
    heart_rate INT,
    movement BOOLEAN,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 12. Error Logs Table: Stores system errors and input validation records
CREATE TABLE error_logs (
    id SERIAL PRIMARY KEY,
    module_name VARCHAR(50),
    error_message TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample admin user
INSERT INTO users_table (username, password_hash, name, rank, status)
VALUES ('admin', '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 'Admin Officer', 'Admin', 'on-duty');

-- Insert sample case
INSERT INTO cases_table (title, description, officer_id, status)
VALUES ('Robbery Investigation', 'Investigate robbery at Main Street.', 1, 'open');

-- Add Indexes for Performance Optimization
CREATE INDEX idx_users_username ON users_table(username);
CREATE INDEX idx_cases_officer_id ON cases_table(officer_id);
CREATE INDEX idx_dispatch_status ON dispatch_table(status);
CREATE INDEX idx_vehicles_plate_number ON vehicles_table(plate_number);
CREATE INDEX idx_citizens_name ON citizens_table(name);
CREATE INDEX idx_weapons_serial_number ON weapons_table(serial_number);
CREATE INDEX idx_inventory_officer_id ON inventory_table(officer_id);
CREATE INDEX idx_cctv_incident_id ON cctv_logs(incident_id);
CREATE INDEX idx_reports_case_id ON reports_table(case_id);
CREATE INDEX idx_patrol_units_unit_name ON patrol_units(unit_name);
CREATE INDEX idx_health_monitor_officer_id ON health_monitor(officer_id);