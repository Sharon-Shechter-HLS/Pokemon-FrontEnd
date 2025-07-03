import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllPokemonPage from "./pages/AllPokemonsPage/AllPokemonPage";
import "./App.css";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-neutrals-100">
        <AllPokemonPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;