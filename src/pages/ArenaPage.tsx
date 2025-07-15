import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

  const { randomPokemon, pokemonById, myPokemons } = useMyPokemons({
    searchQuery: "",
    sortOption: undefined,
    isMyPokemons: false,
    fetchRandom: true,
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      if (pokemonById && !userPokemon && !opponentPokemon) {
        const fetchedPokemon = await pokemonById(Number(userId));
        setUserPokemon(fetchedPokemon);
        setOpponentPokemon(randomPokemon || null);
      }
    };

    fetchPokemon();
  }, [pokemonById, randomPokemon, userPokemon, opponentPokemon, userId]);

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
        <VSComponent userPokemon={userPokemon} opponentPokemon={opponentPokemon} />
      ) : (
        <div className="w-[100%] px-4 pb-10">
          <Arena user={userPokemon} opponent={opponentPokemon} />
        </div>
      )}
    </div>
  );
};

export default ArenaPage;