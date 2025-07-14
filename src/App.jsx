// We now also import the 'useEffect' Hook from React.
import { useState, useEffect } from 'react';

// This is our main App component.
function App() {
  // --- STATE ---
  // We call the useState Hook to create a new piece of state.
  // It returns an array with two things:
  // 1. `title`: The current value of our state variable (its initial value is 'My Digital Journal').
  // 2. `setTitle`: The special function we use to *update* the title state.
  const [title, setTitle] = useState('My Digital Journal');

  // Creates a new state variable 'entries' to store our journal entries.
  // Its initial value is an empty array.
  const [entries, setEntries] = useState([]);

  // The useEffect hook runs code after the component has rendered.
  useEffect(() => {
    // We define an async function to fetch our data.
    const fetchEntries = async () => {
      // Use the browser's fetch API to make a GET request to our server's endpoint.
      const response = await fetch('http://localhost:3001/api/entries');
      // Convert the response from the server into JSON format.
      const data = await response.json();
      // Update our 'entries' state with the data we received.
      setEntries(data);
    };

    // Call the function to actually run the fetch operation.
    fetchEntries();
  }, []); // The empty array [] means this effect will only run ONCE when the component first loads.  

  // --- EVENT HANDLER ---
  // This is the function that will run when our button is clicked.
  const handleTitleChange = () => {
    // We call the state updater function to tell React to change the title.
    setTitle('My Awesome Digital Journal');
  };

  // The 'return' statement contains the JSX that describes our UI.
  return (
    <div className="p-8 font-sans">

      {/* Instead of hard-coding the text, we use curly braces {} to display our 'title' state variable. */}
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

      {/* We add the 'onClick' event handler prop to the button. */}
      {/* When clicked, it will call our 'handleTitleChange' function. */}
      <button
        onClick={handleTitleChange}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Change Title
      </button>

      <p className="mt-4 text-gray-600">This is where I'll write my thoughts and track my daily progress.</p>
      <h2 className="mt-8 text-2xl font-semibold text-gray-700">Recent Entries</h2>
      {/* A list to display the journal entries fetched from the server. */}
      <ul className="mt-2 list-disc list-inside space-y-2">
        {/* We use the .map() method to loop over the 'entries' array. */}
        {/* For each 'entry' object in the array, we render a list item. */}
        {entries.map(entry => (
          // The 'key' prop is a special, required key for React to keep track of list items.
          <li key={entry.id}>
            <strong className="font-semibold">{entry.title}:</strong> {entry.content}
          </li>
        ))}
      </ul>

    </div>
  );
}

// We export the App component so it can be used by the rest of the application.
export default App;