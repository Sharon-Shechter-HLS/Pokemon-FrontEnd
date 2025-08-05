import { useEffect, useState } from "react";
import Arena from "../components/Arena/Arena";
import VSComponent from "../components/PreFight/VScomponent";
import { BattleProvider, useBattleContext } from "../components/Arena/BattleContext";
import type { BattleData } from "../typs/BattleData";
import ArenaHeader from "../components/Arena/ArenaHeader";
import { useMyPokemons } from "../hooks/useMyPokemons";
import type { Pokemon } from "../typs/Pokemon";
import { switchPokemon } from "../api/battelAPI";

type ArenaPageProps = {
  battleData: BattleData;
};

const ArenaPage = ({ battleData }: ArenaPageProps) => {
  const [showVS, setShowVS] = useState(true);
  const [battleDataState, setBattleDataState] = useState(battleData);
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(null); 

  const { pokemons } = useMyPokemons({
    page: 1,
    rowsPerPage: 20,
    isMyPokemons: true,
  });

  useEffect(() => {
    if (showVS) {
      const timer = setTimeout(() => {
        setShowVS(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showVS]);

  const VSComponentWrapper = () => {
    const { battleData } = useBattleContext();

    return (
      <VSComponent
        userPokemon={battleData.user}
        opponentPokemon={battleData.opponent}
      />
    );
  };


  const handlePokemonSwitch = async (newPokemon: Pokemon) => {
    if (battleDataState.hasSwitch) return;

    try {
      const updatedBattleData = await switchPokemon(battleDataState._id, newPokemon._id);
      console.log("Switched Pokémon:", updatedBattleData);

      setBattleDataState(updatedBattleData);
      setSelectedPokemonName(newPokemon.name.english); 
    } catch (error) {
      console.error("Failed to switch Pokémon:", error);
    }
  };

  return (
    <BattleProvider key={battleDataState._id} initialBattleData={battleDataState}>
      <div className="arena-page px-5">
        {/* Arena Header */}
        <ArenaHeader
          headline="Fighting arena"
          description="Start fighting against your opponent to win the battle"
          filterTitle="Switch Pokémon"
          filterOptions={pokemons}
          onPokemonChange={handlePokemonSwitch}
          hasSwitch={battleDataState.hasSwitch ?? false}
          selectedPokemonName={selectedPokemonName ?? undefined}
          className="mb-4"
        />

        {/* Arena Content */}
        {showVS ? (
          <VSComponentWrapper />
        ) : (
          <div className="w-[100%] px-4 pb-10">
            <Arena></Arena>
            
          </div>
        )}
      </div>
    </BattleProvider>
  );
};

export default ArenaPage;