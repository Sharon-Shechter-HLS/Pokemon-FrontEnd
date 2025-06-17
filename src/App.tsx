import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-red-400 px-4">
      <div className="backdrop-blur-lg bg-white/30 border border-white/20 shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
          Welcome to Pokedex
        </h1>
        <p className="text-white/90 text-base font-medium">
          Tailwind CSS + ShadCN are looking sharp!
        </p>
       <Button className="text-black text-lg px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg">
  Click Me
</Button>
      </div>
    </div>
  );
}

export default App;
