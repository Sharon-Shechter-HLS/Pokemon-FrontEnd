import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllPokemonsPage from "./pages/AllpokemonsPage";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AllPokemonsPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;