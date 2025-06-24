import PokemonDropdown from "../src/components/Dropdown/Dropdown";

const pokemonOptions = [
  { name: "Bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", value: 20 },
  { name: "Caterpie", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png", value: 22 },
  { name: "Wartortle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", value: 30 },
  { name: "Pidgey", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png", value: 10 },
]

function App() {
  return (
    <div className="p-6">
      <PokemonDropdown options={pokemonOptions} />
    </div>
  )
}

export default App;
