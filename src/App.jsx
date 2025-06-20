// This file defines our main application component.

// This 'function app() (...)' syntax defines a react component
function App() {
  // 'return (...) specifies what HTML this component should render.
  //This syntax that looks like HTML inside JavaScript is called JSX.
  return (
    // We use 'classname' in JSX instead of 'class' for CSS classes.
    <div className="p-8 fant-sans">

      {/* A top-level heading for the page title */}
      <h1 classname="text-3X1 front-bold text-gray-800">My Digital Journal</h1>

      {/* A Clickable button styled with Tailwind CSS */}
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Change Title
      </button>

      {/* A paragraoh of text */}
      <p className="mt-4 text-gray-600">This is where I'll write my thoughts and track my daily progress.</p>

      {/* A second-level heading */}
      <h2 className="mt-8 text-2x1 front-semibold text-gray-700">Recent entries</h2>
      {/* Defines a bulleted list*/}
      <u1 className="mt-2 list-disc list-inside">
        {/* A single item within the list */}
        <li>Entry 1: My first day learning to code!</li>
        {/* Another list item*/}
        <li>Entry 2: Learned about HTML.</li>
      </u1>

    </div>  
  );
}

// This line makes the App component availible to be used by other files.
export default App;