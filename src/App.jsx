// At the top, we must import the `useState` Hook from the 'react' library.
import { useState } from 'react';

// This is our main App component.
function App() {
  // --- STATE ---
  // We call the useState Hook to create a new piece of state.
  // It returns an array with two things:
  // 1. `title`: The current value of our state variable (its initial value is 'My Digital Journal').
  // 2. `setTitle`: The special function we use to *update* the title state.
  const [title, setTitle] = useState('My Digital Journal');

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
      <ul className="mt-2 list-disc list-inside">
        <li>Entry 1: My first day learning to code!</li>
        <li>Entry 2: Learned about HTML.</li>
      </ul>

    </div>
  );
}

// We export the App component so it can be used by the rest of the application.
export default App;