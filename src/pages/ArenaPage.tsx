import { useEffect, useState } from "react";
import { useLocation, } from "react-router-dom";
import { ArenaHeader } from "../components/Arena/ArenaHeader";
import Arena from "../components/Arena/Arena";
import VSComponent from "../components/PreFight/VScomponent";
import { useMyPokemons } from "../hooks/useMyPokemons";
import type { Pokemon } from "../typs/Pokemon";

const ArenaPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  const [userPokemon, setUserPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);
  const [showVS, setShowVS] = useState(true);

  const { pokemons: allPokemons, randomPokemon } = useMyPokemons({
    searchQuery: "",
    sortOption: undefined,
    isMyPokemons: false,
    fetchRandom: true,
  });

  useEffect(() => {
    if (pokemonById && !userPokemon && !opponentPokemon) {
      setUserPokemon(pokemonById);
      setOpponentPokemon(randomPokemon || null);
    }
  }, [pokemonById, randomPokemon, userPokemon, opponentPokemon]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVS(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handlePokemonChange = (pokemon: Pokemon) => {
    setUserPokemon(pokemon); 
  };

  if (!userPokemon || !opponentPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="arena-page px-5">
      <ArenaHeader
        headline="Welcome to the Arena!"
        description="Choose your Pokémon and battle against opponents."
        filterTitle="Select Your Pokémon"
        filterOptions={myPokemons}
        onPokemonChange={handlePokemonChange} 
      />

      {showVS ? (
        <VSComponent 
          userPokemon={userPokemon}
          opponentPokemon={opponentPokemon}
        />
      ) : (
        <div className="w-[100%] px-4 pb-10">
          <Arena
            user={userPokemon}
            opponent={opponentPokemon}
            starter="user"
          />
        </div>
      )}
    </div>
  );
};

export default ArenaPage;