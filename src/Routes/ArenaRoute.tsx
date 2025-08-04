import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArenaPage from "@/pages/ArenaPage";
import { useContextRoute } from "@/Routes/contextRoute"; 
import { startNewBattle } from "@/api/battelAPI";

const ArenaRoute = () => {
  const navigate = useNavigate();
  const { pokemonId } = useContextRoute();
  const [loading, setLoading] = useState(true);
  const [battleData, setBattleData] = useState(null);

  useEffect(() => {
    const initializeBattle = async () => {
      if (!pokemonId) {
        console.error("Pokemon ID is missing. Redirecting...");
        navigate("/all-pokemons");
        return;
      }

      try {
        console.log("Starting new battle with Pokémon ID:", pokemonId);
        const response = await startNewBattle(pokemonId); 
        setBattleData(response);
        window.history.pushState({}, "", `/arena?battleId=${response._id}`); 
      } catch (error) {
        console.error("Failed to start a new battle:", error);
        navigate("/all-pokemons");
      } finally {
        setLoading(false);
      }
    };

    initializeBattle();
  }, [pokemonId, navigate]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!battleData) {
    return <div className="p-8 text-center">Failed to load battle data.</div>;
  }

  return <ArenaPage battleData={battleData} />;
};

export default ArenaRoute;