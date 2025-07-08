import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
import AllpokemonsPage from "./pages/AllpokemonsPage";
import MypokemonsPage from "./pages/MypokemonsPage";
import Arena from "./components/Arena/Arena"; // Import Arena component
import { useMyPokemons } from "./hooks/useMyPokemons"; // Import useMyPokemons hook
import Arena from "./components/Arena/Arena"; // Import Arena component
import { useMyPokemons } from "./hooks/useMyPokemons"; // Import useMyPokemons hook
import "./App.css";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const items = [
    {
      name: "All Pokémons",
      href: "/all-pokemons",
      isActive: location.pathname === "/all-pokemons",
    },
    {
      name: (
        <span className="flex items-center gap-2">
          My Pokémons
        </span>
      ),
      href: "/my-pokemons",
      isActive: location.pathname === "/my-pokemons",
    },
  ];

  const ArenaRoute = () => {
    const { pokemons, isLoading } = useMyPokemons("", undefined, true); // Fetch Pokémon data

    if (isLoading) {
      return <div className="p-8 text-center">Loading...</div>;
    }

    // Select two Pokémon for testing
    const userPokemon = pokemons[0];
    const opponentPokemon = pokemons[1];

    if (!userPokemon || !opponentPokemon) {
      return <div className="p-8 text-center">Not enough Pokémon available.</div>;
    }

    return (
      <Arena
        user={userPokemon} // Pass user Pokémon data
        opponent={opponentPokemon} // Pass opponent Pokémon data
        starter="user" // Define the starter (user starts the battle)
        className="p-8"
      />
    );
  };

  return (
    <>
      <Header items={items} />
      <Routes>
        <Route path="/all-pokemons" element={<AllpokemonsPage />} />
        <Route path="/my-pokemons" element={<MypokemonsPage />} />
        <Route path="/arena" element={<ArenaRoute />} />
        <Route path="/arena" element={<ArenaRoute />} />
        <Route path="/" element={<Navigate to="/all-pokemons" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;