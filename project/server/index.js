const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this to your MySQL username
    password: 'yourpassword', // Change this to your MySQL password
    database: 'authDB'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// Route: Home Page
app.get('/', function (req, res) {
    res.send('Welcome to the Authentication System');
});

// Route: User Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error or user already exists' });
        }
        res.json({ message: 'User registered successfully', id: result.insertId });
    });
});

// Route: User Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = result[0];

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

// Start the server
app.listen(3001, () => {
    console.log('Authentication API running at http://localhost:3001/');
});
