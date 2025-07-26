import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMyPokemons } from "../hooks/useMyPokemons";
import type { Pokemon } from "../typs/Pokemon";
import ArenaPage from "@/pages/ArenaPage";

const ArenaRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const pokemonId = queryParams.get("id"); // Get the 'id' parameter from the URL

  const [userPokemon, setUserPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);

  const { pokemonById, randomPokemon, isLoading } = useMyPokemons({
    isMyPokemons: false,
    fetchRandom: true,
  });

  useEffect(() => {
    const fetchPokemons = async () => {
      if (!pokemonId) {
        // Redirect to a default page if no ID is provided
        navigate("/all-pokemons");
        return;
      }

      const fetchedUserPokemon = await pokemonById(Number(pokemonId));
      if (!fetchedUserPokemon) {
        // Redirect if the Pokémon with the given ID doesn't exist
        navigate("/all-pokemons");
        return;
      }

      setUserPokemon(fetchedUserPokemon);
      setOpponentPokemon(randomPokemon || null);
    };

    fetchPokemons();
  }, [pokemonId, pokemonById, randomPokemon, navigate]);

  if (isLoading || !userPokemon || !opponentPokemon) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <ArenaPage
      userPokemon={userPokemon}
      opponentPokemon={opponentPokemon}
    />
  );
};

export default ArenaRoute;