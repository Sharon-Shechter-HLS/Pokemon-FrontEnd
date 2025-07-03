import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Import routing components
import Header from "./components/Header/Header";
import AllPokemonPage from "./pages/AllPokemonsPage/AllPokemonPage";
import MypokemonPage from "./pages/AllPokemonsPage/MypokemonPage";
import "./App.css";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <div className="App">
          <Routes>
            {/* Default route to AllPokemonPage */}
            <Route path="/" element={<Navigate to="/allpokemon" replace />} />
            {/* Route for All Pokemon Page */}
            <Route path="/allpokemon" element={<AllPokemonPage />} />
            {/* Route for My Pokemon Page */}
            <Route path="/mypokemon" element={<MypokemonPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;