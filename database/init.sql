-- Create the citizens table
CREATE TABLE citizens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    citizen_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    dob TEXT NOT NULL
);

-- Create the weapons table
CREATE TABLE weapons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    citizen_id TEXT NOT NULL,
    weapon_type TEXT NOT NULL,
    serial_number TEXT NOT NULL,
    purchase_date TEXT NOT NULL,
    FOREIGN KEY (citizen_id) REFERENCES citizens(citizen_id)
);

-- Insert sample data into the citizens table
INSERT INTO citizens (citizen_id, name, dob) VALUES
('C123', 'John Doe', '1990-01-01'),
('C456', 'Jane Smith', '1985-05-15');

-- Insert sample data into the weapons table
INSERT INTO weapons (citizen_id, weapon_type, serial_number, purchase_date) VALUES
('C123', 'Handgun', 'HG12345', '2022-03-15'),
('C456', 'Rifle', 'RF67890', '2021-07-20');