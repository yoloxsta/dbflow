const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // replace with your MySQL username
    password: 'yngWIE500',  // replace with your MySQL password
    database: 'simple_project'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the database.');
    }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the frontend (if needed)
app.use(express.static('public'));

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send('Name is required.');
    }

    const query = 'INSERT INTO users (name) VALUES (?)';
    db.query(query, [name], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error.');
        }
        res.status(200).send('Data inserted successfully.');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
