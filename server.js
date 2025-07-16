// --- IMPORTS ---
import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// --- DATABASE SETUP ---
const file = './db.json';
const adapter = new JSONFile(file);
const defaultData = { entries: [], users: [] };
const db = new Low(adapter, defaultData);
await db.read();

// --- SERVER SETUP ---
const PORT = 3001;
const app = express();
const JWT_SECRET = 'my-super-secret-key-that-is-very-long-and-secure';
app.use(cors());
app.use(express.json());

// --- API ROUTES ---
// This route gets all journal entries.
app.get('/api/entries', (req, res) => {
  const entries = db.data.entries;
  res.json(entries);
});

// This route creates a new journal entry.
app.post('/api/entries', async (req, res) => {
  const newEntry = req.body;
  newEntry.id = Date.now();
  db.data.entries.push(newEntry);
  await db.write();
  res.json(newEntry);
});

// This route deletes a specific journal entry by its ID.
app.delete('/api/entries/:id', async (req, res) => {
  const entryId = parseInt(req.params.id);
  db.data.entries = db.data.entries.filter(entry => entry.id !== entryId);
  await db.write();
  res.json({ message: 'Entry deleted successfully!' });
});

// Route for user registration.
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, password: hashedPassword };

    // Ensure the users array exists before pushing to it.
    db.data.users = db.data.users || [];
    db.data.users.push(newUser);
    await db.write();

    res.status(201).json({ message: 'User created successfully!' });
});

// Route for user login.
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = db.data.users.find(u => u.username === username);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});


// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});