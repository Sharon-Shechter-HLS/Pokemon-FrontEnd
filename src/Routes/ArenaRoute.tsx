import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArenaPage from "@/pages/ArenaPage";
import { useContextRoute } from "@/Routes/contextRoute"; 
import { startNewBattle } from "@/api/battelAPI";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"; 
import type { BattleData } from "@/typs/BattleData"; 

const ArenaRoute = () => {
  const navigate = useNavigate();
  const { pokemonId } = useContextRoute();
  const [loading, setLoading] = useState(true);
  const [battleData, setBattleData] = useState<BattleData | null>(null); 

  useEffect(() => {
    const initializeBattle = async () => {
      if (!pokemonId) {
        console.error("Pokemon ID is missing. Redirecting...");
        navigate("/all-pokemons");
        return;
      }

      try {
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
    return (
      <div className="arena-page flex items-center justify-center h-screen">
        <LoadingSpinner className="w-16 h-16 text-gray-500" />
      </div>
    );
  }

  if (!battleData) {
    return <div className="p-8 text-center">Failed to load battle data.</div>;
  }

  return (
    <ArenaPage key={battleData._id} battleData={battleData} />
  );
};

export default ArenaRoute;