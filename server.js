// Imports the 'express' library to create and manage the server.
import express from 'express';

// Defines the port number our server will listen on. 3001 is common for developement.
const PORT = 3001;

// Creates an instance of an Express application, which we will configure.
const app = express();

// Defines a route handler for GET requests to the root URL ('/').
app.get('/', (req, res) => {
    // When a request is received, send back a JSON response.
    // 'req' is the request from the client, 'res' is the respond we send.
    res.json({ message: "Hello from the server!" });
});

// Starts the server and makes it listen for connections on the specific PORT.
app.listen(PORT, () => {
    // This function runs once the server is successfully started.
    // It logs a message to our terminal so we know everything is working.
    // To embed a variable inside a string, you must use backticks (`).
    console.log(`Server is running on http://localhost:${PORT}`);
});