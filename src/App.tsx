import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Header from "./components/Header/Header";
import AllPokemonPage from "./pages/AllPokemonsPage/AllPokemonPage";
import MypokemonPage from "./pages/AllPokemonsPage/MypokemonPage";
import Arena from "./pages/Arena/Arena"; // Import the Arena component
import pokemonDat from "./data/pokemonsData.json"; // Import Pokémon data
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const userPokemon = pokemonDat.find(pokemon => pokemon.id === 1) ?? pokemonDat[0]; 
  const opponentPokemon = pokemonDat.find(pokemon => pokemon.id === 2) ?? pokemonDat[1]; 
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <div className="App bg-neutral-100">
          <Routes>
            <Route path="/" element={<Navigate to="/allpokemon" replace />} />
            <Route path="/allpokemon" element={<AllPokemonPage />} />
            <Route path="/mypokemon" element={<MypokemonPage />} />
            <Route
              path="/arena"
              element={
                <Arena
                  userPokemon={userPokemon} 
                  opponentPokemon={opponentPokemon} 
                />
              }
            /> {/* Add the Arena route */}
          </Routes>
        </div>
        {/* Add any additional components or modals here */}
        {/* Example: <ChoosePokemonModal /> */}
      </Router>
    </QueryClientProvider>
  );
}

export default App;