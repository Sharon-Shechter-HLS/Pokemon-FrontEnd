import { useLocation } from "react-router-dom"; 
import { useEffect, useState } from "react";
import Arena from "@/pages/Arena/Arena";
import { ArenaHeader } from "@/components/Header/arenaHeader";
import VSComponent from "@/components/PreFight/VSComponent";
import type { Pokemon } from "@/typs/Pokemon"; 

export default function ArenaPage() {
  const location = useLocation(); 
  const { userPokemon, opponentPokemon }: { userPokemon: Pokemon; opponentPokemon: Pokemon } = location.state || {}; // Explicitly type state

  const [userTurn, setUserTurn] = useState(true);
  const [userCurrentHP, setUserCurrentHP] = useState<number>(userPokemon?.base.HP || 0); 
  const [opponentCurrentHP, setOpponentCurrentHP] = useState<number>(opponentPokemon?.base.HP || 0); 
  const [dialogue, setDialogue] = useState("Your turn!");
  const [canCatchPokemon, setCanCatchPokemon] = useState(false);
  const [showVSComponent, setShowVSComponent] = useState(true);

  useEffect(() => {
    // Show VSComponent for 5 seconds
    const timer = setTimeout(() => setShowVSComponent(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleAttack = () => {
    if (userTurn && opponentPokemon) {
      const damage = userPokemon?.base.Attack || 0;
      setDialogue(`${userPokemon?.name.english} attacks!`);
      setOpponentCurrentHP((prev: number) => Math.max(prev - damage, 0)); // Add type annotation for prev
      setCanCatchPokemon(opponentCurrentHP - damage <= opponentPokemon.base.HP * 0.3 && opponentCurrentHP - damage > 0);

      // Check if opponent fainted
      if (opponentCurrentHP - damage <= 0) {
        setTimeout(() => {
          setDialogue(`${opponentPokemon.name.english} fainted!`);
        }, 1000);
      } else {
        // Simulate opponent's attack after a delay
        setTimeout(() => {
          const opponentDamage = opponentPokemon?.base.Attack || 0;
          setDialogue(`${opponentPokemon.name.english} attacks!`);
          setUserCurrentHP((prev: number) => Math.max(prev - opponentDamage, 0)); // Add type annotation for prev

          // Check if user fainted
          if (userCurrentHP - opponentDamage <= 0) {
            setTimeout(() => {
              setDialogue(`${userPokemon?.name.english} fainted!`);
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
      setDialogue(`You caught ${opponentPokemon?.name.english}!`);
    }
  };

  if (!userPokemon || !opponentPokemon) {
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
            userPokemon={userPokemon}
            opponentPokemon={opponentPokemon}
          />
        ) : (
          <Arena
            className="w-full h-[90%] bg-cover bg-center relative"
            userPokemon={userPokemon}
            opponentPokemon={opponentPokemon}
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