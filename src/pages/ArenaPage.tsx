import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArenaHeader } from "../components/Arena/ArenaHeader";
import Arena from "../components/Arena/Arena";
import VSComponent from "../components/PreFight/VScomponent";
import { useMyPokemons } from "../hooks/useMyPokemons";
import type { Pokemon } from "../typs/Pokemon";

const ArenaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  const [userPokemon, setUserPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);
  const [showVS, setShowVS] = useState(true);

  const { pokemons: allPokemons, randomPokemon } = useMyPokemons("", undefined, false, true);

  // Set user and opponent Pokémon only once when data is available
  useEffect(() => {
    if (userId && allPokemons.length > 0 && !userPokemon && !opponentPokemon) {
      const selectedUserPokemon = allPokemons.find((pokemon) => pokemon.id === Number(userId));
      setUserPokemon(selectedUserPokemon || null);
      setOpponentPokemon(randomPokemon || null);
    }
  }, [userId, allPokemons, randomPokemon, userPokemon, opponentPokemon]);

  // Hide VS screen after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVS(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!userPokemon || !opponentPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="arena-page">
      <ArenaHeader
        headline="Welcome to the Arena!"
        description="Choose your Pokémon and battle against opponents."
        filterTitle="Select Your Pokémon"
        filterOptions={allPokemons}
        onPokemonChange={(pokemon) => navigate(`/arena?userId=${pokemon.id}`)}
      />

      {showVS ? (
        <VSComponent
          userPokemon={userPokemon}
          opponentPokemon={opponentPokemon}
        />
      ) : (
        <Arena
          user={userPokemon}
          opponent={opponentPokemon}
          starter="user"
        />
      )}
    </div>
  );
};

export default ArenaPage;