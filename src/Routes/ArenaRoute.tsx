import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ArenaPage from "@/pages/ArenaPage";
import { UserId } from "@/consts";

const ArenaRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pokemonId = queryParams.get("pokemonId"); // Get the Pokémon `_id` from the URL

  const [battleData, setBattleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startGame = async () => {
      console.log("Starting game with Pokémon ID:", pokemonId);
      
      if (!pokemonId) {
        navigate("/all-pokemons");
        return;
      }

      try {

        const response = await axios.post("http://localhost:3000/arena/startGame", {
          userId: UserId, // Use the default user ID from consts
          pokemonId, // Pokémon `_id` from the URL
        });
        setBattleData(response.data); // Set the battle data from the response
      } catch (error) {
        console.error("Failed to start the game:", error);
        navigate("/all-pokemons"); // Redirect to the Pokémon list if the request fails
      } finally {
        setLoading(false);
      }
    };

    startGame();
  }, [pokemonId, navigate]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!battleData) {
    return <div className="p-8 text-center">Failed to start the game.</div>;
  }

  return <ArenaPage battleData={battleData} />;
};

export default ArenaRoute;