// Imports the cors library to handle cross-origin requests.
import cors from 'cors';

// Imports the 'express' library to create and manage the server.
import express from 'express';

// Defines the port number our server will listen on. 3001 is common for developement.
const PORT = 3001;

// Creates an instance of an Express application, which we will configure.
const app = express();

// Enables CORS for all routes, allowing our React app to communicate with the server.
app.use(cors());

// Defines a route handler for GET requests to the root URL ('/').
app.get('/', (req, res) => {
    // When a request is received, send back a JSON response.
    // 'req' is the request from the client, 'res' is the respond we send.
    res.json({ message: "Hello from the server!" });
});

// Defines some mock (fake) data four our journal entries.
const journalEntries = [
    { id: 1, title: "First Day", content: "Learned about HTML and CSS. It was fun!" },
    { id: 2, title: "React State", content: "useState is the key to making things interactive." }
];

// Defines a new API endpoint to get all journal entries.
app.get('/api/entries', (req, res) =>{
    // When a client requests this URL, send back the journalEntries array as JSON.
    res.json(journalEntries);
});

// Starts the server and makes it listen for connections on the specific PORT.
app.listen(PORT, () => {
    // This function runs once the server is successfully started.
    // It logs a message to our terminal so we know everything is working.
    // To embed a variable inside a string, you must use backticks (`).
    console.log(`Server is running on http://localhost:${PORT}`);
});