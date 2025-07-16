// We now also import the 'useEffect' Hook from React.
import { useState, useEffect } from 'react';

// This is our main App component.
function App() {
  // --- STATE ---
  const [title, setTitle] = useState('My Digital Journal');
  const [entries, setEntries] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // --- EFFECTS ---
  // This useEffect Hook fetches the initial entries when the component loads.
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch(`http://localhost:3001/api/entries`);
      const data = await response.json();
      setEntries(data);
    };
    fetchEntries();
  }, []);

  // --- EVENT HANDLERS ---
  const handleTitleChange = () => {
    setTitle('My Awesome Digital Journal');
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });
    const addedEntry = await response.json();
    setEntries([...entries, addedEntry]);
    setNewTitle('');
    setNewContent('');
  };

  // This function handles deleting an entry. It takes the entry's ID as an argument.
  const handleDeleteEntry = async (idToDelete) => {
    // Send a DELETE request to our server's new endpoint, including the ID in the URL.
    await fetch(`http://localhost:3001/api/entries/${idToDelete}`, {
      // Set the method to DELETE.
      method: 'DELETE',
    });
    // Update our local 'entries' state by filtering out the deleted entry.
    setEntries(entries.filter(entry => entry.id !== idToDelete));
  };

  // --- RENDER ---
  return (
    <div className="p-8 font-sans">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

      <form onSubmit={handleAddEntry} className="mt-8 p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Add a New Entry</h3>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            placeholder="Write your entry..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add Entry
          </button>
        </div>
      </form>

      <button
        onClick={handleTitleChange}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Change Title
      </button>

      <p className="mt-4 text-gray-600">This is where I'll write my thoughts and track my daily progress.</p>
      <h2 className="mt-8 text-2xl font-semibold text-gray-700">Recent Entries</h2>
      <ul className="mt-2 list-disc list-inside space-y-2">
        {entries.map(entry => (
          // THIS IS THE CORRECTED LIST ITEM BLOCK
          <li key={entry.id} className="flex justify-between items-center p-2 bg-white rounded shadow">
            {/* This span contains the text content */}
            <span>
              <strong className="font-semibold">{entry.title}:</strong> {entry.content}
            </span>
            {/* This button handles the delete action */}
            <button
              onClick={() => handleDeleteEntry(entry.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;