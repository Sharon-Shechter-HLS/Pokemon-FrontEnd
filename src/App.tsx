import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
import AllPokemonsPage from "./pages/AllPokemonsPage";
import MyPokemonsPage from "./pages/MyPokemonsPage";
import ArenaRoute from "./Routes/ArenaRoute";
import { ROUTES } from "./constants/routes";
import "./App.css";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const items = [
    {
      name: "All Pokémons",
      href: ROUTES.ALL_POKEMONS,
      isActive: location.pathname === ROUTES.ALL_POKEMONS,
    },
    {
      name: (
        <span className="flex items-center gap-2">
          My Pokémons
            <img src={pokadexIcon} alt="Pokédex Icon" className="w-5 h-5" /> {/* Add the icon */}
        </span>
      ),
      href: ROUTES.MY_POKEMONS,
      isActive: location.pathname === ROUTES.MY_POKEMONS,
    },
  ];

  return (
    <>
      <Header items={items} />
      <Routes>
        <Route path={ROUTES.ALL_POKEMONS} element={<AllPokemonsPage />} />
        <Route path={ROUTES.MY_POKEMONS} element={<MyPokemonsPage />} />
        <Route path={ROUTES.ARENA} element={<ArenaRoute />} />
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.ALL_POKEMONS} replace />} />
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