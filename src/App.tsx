import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
import AllPokemonsPage from "./pages/AllpokemonsPage";
import MyPokemonsPage from "./pages/MypokemonsPage";
import { ROUTES } from "./constants/routes";
import "./App.css";
import ArenaRoute from "./Routes/ArenaRoute";

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
      name: "My Pokémons",
      href: ROUTES.MY_POKEMONS,
      isActive: location.pathname === ROUTES.MY_POKEMONS,
    },
  ];

  const backgroundClass ="bg-primary-50";

  return (
    <>
      <Header items={items} />
      <div className={backgroundClass}>
        <Routes>
          <Route path={ROUTES.ALL_POKEMONS} element={<AllPokemonsPage />} />
          <Route path={ROUTES.MY_POKEMONS} element={<MyPokemonsPage />} />
          <Route path={ROUTES.ARENA} element={<ArenaRoute />} />
          <Route
            path={ROUTES.HOME}
            element={<Navigate to={ROUTES.ALL_POKEMONS} replace />}
          />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
       <div className="bg-primary-50"> 
          <AppContent />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;