import { useEffect, useState } from "react";
import { ArenaHeader } from "../components/Arena/ArenaHeader";
import Arena from "../components/Arena/Arena";
import VSComponent from "../components/PreFight/VScomponent";
import type { Pokemon } from "../typs/Pokemon";

interface ArenaPageProps {
  userPokemon: Pokemon;
  opponentPokemon: Pokemon;
}

const ArenaPage = ({ userPokemon: initialUserPokemon, opponentPokemon: initialOpponentPokemon }: ArenaPageProps) => {
  const [userPokemon, setUserPokemon] = useState<Pokemon | null>(initialUserPokemon);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(initialOpponentPokemon);
  const [showVS, setShowVS] = useState(true);

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
        filterOptions={[]} // Replace with actual filter options if needed
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