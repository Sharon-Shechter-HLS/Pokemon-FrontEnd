
import pokemonsData from "./data/pokemonsData.json";
import PokemonTable from "./components/PokemonTable/PokemonTable";
import "./App.css"
function App() {
  return (
    <div className="center mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Pokédex</h1>
      <PokemonTable pokemons={pokemonsData}/>
    </div>
  );
}

export default App;