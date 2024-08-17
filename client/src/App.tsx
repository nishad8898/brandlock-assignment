import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-slate-600 flex flex-col">
      <h1 className="text-center text-3xl font-bold p-4 text-white">
        Dynamic Dashboard
      </h1>
      <div className="flex-grow">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
