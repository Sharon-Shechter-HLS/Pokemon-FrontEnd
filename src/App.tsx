import { useState } from "react";
import Dropdown from "./components/Dropdown/Dropdown";
import Input from "./components/Input /Input";

const pokemonOptions = [
  { name: "Bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", value: 20 },
  { name: "Caterpie", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", value: 22 },
  { name: "Wartortle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", value: 30 },
  { name: "Pidgey", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", value: 10 },
];

function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 gap-8">
      <h1 className="text-2xl font-bold">Dropdown with Search</h1>

      <Dropdown options={pokemonOptions} />

      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for Pokémon"
      />
    </div>
  );
}

export default App;
