// --- IMPORTS ---
// We still need express and cors.
import express from 'express';
import cors from 'cors';
// We import the new lowdb library.
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// --- DATABASE SETUP ---
// Define the path to our JSON database file.
const file = './db.json';
// Create a new JSONFile adapter.
const adapter = new JSONFile(file);
// Define the default data structure for our database.
const defaultData = { entries: [] };
// Create a new lowdb instance, passing it the adapter AND the default data.
// This is the crucial fix for the 'missing default data' error.
const db = new Low(adapter, defaultData);
// Read the initial data from db.json.
await db.read();

// --- SERVER SETUP ---
// Define the port number.
const PORT = 3001;
// Create an instance of an Express application.
const app = express();
// Enable CORS for all routes.
app.use(cors());

// --- API ROUTES ---
// This is our route to get all journal entries.
app.get('/api/entries', (req, res) => {
  // Get the 'entries' array from our database's data.
  const entries = db.data.entries;
  // Send the entries back to the client as JSON.
  res.json(entries);
});

// --- START SERVER ---
// Start the server and listen for connections.
app.listen(PORT, () => {
  // Log a message to the console so we know it's running.
  console.log(`Server is running on http://localhost:${PORT}`);
});