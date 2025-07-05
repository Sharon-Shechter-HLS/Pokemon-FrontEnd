import { useState, useEffect } from "react";
import VSComponent from "@/components/PreFight/VSComponent";
import DialogueBox from "@/components/Dialog/Dialog";
import GameButton from "@/components/Button/FightButton";
import progressBarRow from "@/components/progressBar/progressBarRow";
import type { Pokemon } from "@/typs/Pokemon";
import gloveIcon from "@/assets/gloveIcon.svg"; 
import attackBackground from "@/assets/attackBackground.png";
import pokadexIcon from "@/assets/pokadex.svg";  

type ArenaProps = {
  userPokemon: Pokemon; 
  opponentPokemon: Pokemon; 
};

function Arena({ userPokemon, opponentPokemon }: ArenaProps) {
  const [showVSComponent, setShowVSComponent] = useState(true);
  const [userTurn, setUserTurn] = useState(true); // Track whose turn it is
  const [userCurrentHP, setUserCurrentHP] = useState(userPokemon.base.HP); // User's current HP
  const [opponentCurrentHP, setOpponentCurrentHP] = useState(opponentPokemon.base.HP); // Opponent's current HP

  useEffect(() => {
    // Hide VSComponent after 5 seconds
    const timer = setTimeout(() => setShowVSComponent(false), 5000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleAttack = () => {
    if (userTurn) {
      setOpponentCurrentHP((prevHP) => Math.max(prevHP - userPokemon.base.Attack, 0));
      setUserTurn(false); // Switch turn to opponent
    }
  };

  const opponentAttack = () => {
    setUserCurrentHP((prevHP) => Math.max(prevHP - opponentPokemon.base.Attack, 0));
    setUserTurn(true); // Switch turn back to user
  };

  useEffect(() => {
    if (!userTurn && opponentCurrentHP > 0) {
      const timer = setTimeout(opponentAttack, 2000); // Opponent attacks after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [userTurn, opponentCurrentHP]);

  return (
    <div className="bg-neutral-100 min-h-screen flex flex-col items-center justify-center">
      {showVSComponent ? (
        <VSComponent userPokemon={userPokemon} opponentPokemon={opponentPokemon} />
      ) : (
        <div className="flex flex-col items-center gap-8">
          {/* Pokémon Stats and Photos */}
          <div className="flex justify-between w-full max-w-4xl">
            {/* User Pokémon */}
            <div className="flex flex-col items-center">
              <img
                src={ userPokemon.image.thumbnail }
                alt={`${userPokemon.name.english} sprite`}
                className="w-32 h-32 object-contain"
              />
              {progressBarRow({
                HP: userPokemon.base.HP,
                CurrentHP: userCurrentHP,
                pokemonName: userPokemon.name.english,
                speed: userPokemon.base.Speed,
              })}
            </div>

            {/* Opponent Pokémon */}
            <div className="flex flex-col items-center">
              <img
                src={ opponentPokemon.image.thumbnail}
                alt={`${opponentPokemon.name.english} sprite`}
                className="w-32 h-32 object-contain"
              />
              {progressBarRow({
                HP: opponentPokemon.base.HP,
                CurrentHP: opponentCurrentHP,
                pokemonName: opponentPokemon.name.english,
                speed: opponentPokemon.base.Speed,
              })}
            </div>
          </div>

          {/* Fight Buttons */}
          <div className="flex gap-4">
            <GameButton
              title="Attack"
              imageUrl={attackBackground}
              svg={<img src={gloveIcon} alt="Attack Icon" />}
              onClick={handleAttack}
              disabled={!userTurn || opponentCurrentHP <= 0} // Disable if not user's turn or opponent is defeated
            />
            <GameButton
              title="Catch"
              svg={<img src={pokadexIcon} alt="Pokédex Icon" />}
              onClick={() => console.log("Catch button clicked")}
              disabled={true} // Catch functionality can be added later
            />
          </div>

          {/* Dialogue Box */}
          <DialogueBox text={userTurn ? "Your turn!" : "Opponent's turn!"} />
        </div>
      )}
    </div>
  );
}

export default Arena;