const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Connect to the SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

app.use(express.json());
app.use(express.static('public'));

// API endpoint to register a weapon
app.post('/api/weapons', (req, res) => {
  const { citizenId, weaponType, serialNumber, purchaseDate } = req.body;

  if (!citizenId || !weaponType || !serialNumber || !purchaseDate) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `
    INSERT INTO weapons (citizen_id, weapon_type, serial_number, purchase_date)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [citizenId, weaponType, serialNumber, purchaseDate], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to register weapon.' });
    }

    res.status(201).json({ message: 'Weapon registered successfully.', weaponId: this.lastID });
  });
});

// API endpoint to fetch registered weapons
app.get('/api/weapons', (req, res) => {
  const query = `
    SELECT w.citizen_id, c.name AS citizen_name, w.weapon_type, w.serial_number, w.purchase_date
    FROM weapons w
    JOIN citizens c ON w.citizen_id = c.citizen_id
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to fetch weapons.' });
    }

    res.json(rows);
  });
});

// API endpoint to fetch citizen details
app.get('/api/citizens/:citizenId', (req, res) => {
  const { citizenId } = req.params;

  const query = 'SELECT * FROM citizens WHERE citizen_id = ?';

  db.get(query, [citizenId], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to fetch citizen details.' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Citizen not found.' });
    }

    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});