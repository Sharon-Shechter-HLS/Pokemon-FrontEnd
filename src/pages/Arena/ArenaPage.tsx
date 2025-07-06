import { useEffect, useState } from "react";
import Arena from "@/pages/Arena/Arena";
import { ArenaHeader } from "@/components/Header/arenaHeader";
import VSComponent from "@/components/PreFight/VSComponent";
import { useMyPokemons } from "@/hooks/useMyPokemons";
import type { Pokemon } from "@/typs/Pokemon";

export default function ArenaPage() {
  const { pokemons: myPokemons, isLoading } = useMyPokemons();
  const [currentUser, setCurrentUser] = useState<Pokemon | null>(null);
  const [opponent, setOpponent] = useState<Pokemon | null>(null);

  const [userTurn, setUserTurn] = useState(true);
  const [userCurrentHP, setUserCurrentHP] = useState(0);
  const [opponentCurrentHP, setOpponentCurrentHP] = useState(0);
  const [dialogue, setDialogue] = useState("Your turn!");
  const [canCatchPokemon, setCanCatchPokemon] = useState(false);
  const [showVSComponent, setShowVSComponent] = useState(true);

  useEffect(() => {
    // Initialize the opponent and user Pokémon
    if (myPokemons.length > 1) {
      setCurrentUser(myPokemons[0]); // First Pokémon as user
      setOpponent(myPokemons[1]); // Second Pokémon as opponent
      setUserCurrentHP(myPokemons[0].base.HP);
      setOpponentCurrentHP(myPokemons[1].base.HP);
    }
  }, [myPokemons]);

  useEffect(() => {
    // Show VSComponent for 5 seconds
    const timer = setTimeout(() => setShowVSComponent(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleAttack = () => {
    if (userTurn && opponent) {
      const damage = currentUser?.base.Attack || 0;
      setDialogue(`${currentUser?.name.english} attacks!`);
      setOpponentCurrentHP((prev) => Math.max(prev - damage, 0));
      setCanCatchPokemon(opponentCurrentHP - damage <= opponent.base.HP * 0.3 && opponentCurrentHP - damage > 0);

      // Check if opponent fainted
      if (opponentCurrentHP - damage <= 0) {
        setTimeout(() => {
          setDialogue(`${opponent.name.english} fainted!`);
        }, 1000);
      } else {
        // Simulate opponent's attack after a delay
        setTimeout(() => {
          const opponentDamage = opponent?.base.Attack || 0;
          setDialogue(`${opponent.name.english} attacks!`);
          setUserCurrentHP((prev) => Math.max(prev - opponentDamage, 0));

          // Check if user fainted
          if (userCurrentHP - opponentDamage <= 0) {
            setTimeout(() => {
              setDialogue(`${currentUser?.name.english} fainted!`);
            }, 1000);
          } else {
            setUserTurn(true); // Switch back to user's turn
            setDialogue("Your turn!");
          }
        }, 2000); // Opponent attacks after 2 seconds
      }
    }
  };

  const handleCatch = () => {
    if (canCatchPokemon) {
      setDialogue(`You caught ${opponent?.name.english}!`);
    }
  };

  if (isLoading || !currentUser || !opponent) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="bg-neutral-100 px-6 py-2 pb-0 mb-0 h-screen">
      <ArenaHeader
        headline="Fighting Arena"
        description="Start fighting against your opponent to win the battle"
        className="justify-center items-center text-center mb-2"
      />
      <div className="w-full h-full">
        {showVSComponent ? (
          <VSComponent
            userPokemon={currentUser}
            opponentPokemon={opponent}
          />
        ) : (
          <Arena
            className="w-full h-[90%] bg-cover bg-center relative"
            userPokemon={currentUser}
            opponentPokemon={opponent}
            userCurrentHP={userCurrentHP}
            opponentCurrentHP={opponentCurrentHP}
            userTurn={userTurn}
            dialogue={dialogue}
            onAttack={handleAttack}
            onCatch={handleCatch}
            canCatchPokemon={canCatchPokemon}
          />
        )}
      </div>
    </div>
  );
}