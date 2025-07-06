import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Header from "./components/Header/Header";
import AllPokemonPage from "./pages/AllPokemonsPage/AllPokemonPage";
import MypokemonPage from "./pages/AllPokemonsPage/MypokemonPage";
import ArenaPage from "./pages/Arena/ArenaPage"; // Import the ArenaPage component
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <div className="App bg-neutral-100">
          <Routes>
            <Route path="/" element={<Navigate to="/allpokemon" replace />} />
            <Route path="/allpokemon" element={<AllPokemonPage />} />
            <Route path="/mypokemon" element={<MypokemonPage />} />
            <Route path="/arena" element={<ArenaPage />} /> {/* Use ArenaPage instead of Arena */}
          </Routes>
        </div>
        {/* Add any additional components or modals here */}
      </Router>
    </QueryClientProvider>
  );
}

export default App;