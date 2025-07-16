// --- IMPORTS ---
import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// --- DATABASE SETUP ---
const file = './db.json';
const adapter = new JSONFile(file);
const defaultData = { entries: [] };
const db = new Low(adapter, defaultData);
await db.read();

// --- SERVER SETUP ---
const PORT = 3001;
const app = express();
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

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});