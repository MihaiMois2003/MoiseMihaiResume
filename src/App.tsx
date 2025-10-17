import Scene from "./components/Scene/Scene";

function App() {
  return (
    <div className="relative w-full h-full">
      <Scene />
      <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
        Tailwind Works! ✓
      </div>
    </div>
  );
}

export default App;
