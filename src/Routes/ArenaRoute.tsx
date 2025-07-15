import { useMyPokemons } from "../hooks/useMyPokemons";
import Arena from "../components/Arena/Arena";

const ArenaRoute = () => {
  const { pokemons, isLoading } = useMyPokemons({
    isMyPokemons: true,
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const userPokemon = pokemons[1];
  const opponentPokemon = pokemons[0];

  if (!userPokemon || !opponentPokemon) {
    return <div className="p-8 text-center">Not enough Pokémon available.</div>;
  }

  return (
    <Arena
      user={userPokemon}
      opponent={opponentPokemon}
      starter="user"
    />
  );
};

export default ArenaRoute;