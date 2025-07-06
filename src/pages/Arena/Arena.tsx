import DialogueBox from "@/components/Dialog/Dialog";
import GameButton from "@/components/Button/FightButton";
import progressBarRow from "@/components/progressBar/progressBarRow";
import type { Pokemon } from "@/typs/Pokemon";
import arenaBattel from "@/assets/arenaBattel.svg"; 
import attackBackground from "@/assets/attackBackground.png"; 
import pokadexIcon from "@/assets/pokadex.svg"; 
import gloveIcon from "@/assets/gloveIcon.svg"; 


export type ArenaProps = {
  className?: string;
  userPokemon: Pokemon;
  opponentPokemon: Pokemon;
  userCurrentHP: number;
  opponentCurrentHP: number;
  userTurn: boolean;
  dialogue: string;
  onAttack?: () => void;
  onCatch?: () => void;
  canCatchPokemon: boolean;
};

const Arena = ({
  className = "",
  userPokemon,
  opponentPokemon,
  userCurrentHP,
  opponentCurrentHP,
  userTurn,
  dialogue,
  onAttack = () => {},
  onCatch = () => {},
  canCatchPokemon,
}: ArenaProps) => {
  return (
    <div
      className={`arena-background ${className} bg-neutral-100 min-h-screen flex flex-col items-center justify-center`}
      style={{
        backgroundImage: `url(${arenaBattel})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Opponent Pokémon */}
      <div className="absolute top-40 right-90 flex flex-col items-center">
        <img
          src={opponentPokemon.image.thumbnail}
          alt={`${opponentPokemon.name.english} sprite`}
          className="w-50 h-50 object-contain"
        />
      </div>
      <div className="absolute top-25 right-4">
        {progressBarRow({
          HP: opponentPokemon.base.HP,
          CurrentHP: opponentCurrentHP,
          pokemonName: opponentPokemon.name.english,
          speed: opponentPokemon.base.Speed,
        })}
      </div>

      {/* Dialogue Box */}
      <DialogueBox
        text={dialogue}
        className="absolute top-40 left-0.5"
      />

      {/* User Pokémon */}
      <div className="absolute bottom-30 left-90 flex flex-col items-center">
        <img
          src={userPokemon.image.thumbnail}
          alt={`${userPokemon.name.english} sprite`}
          className="w-50 h-50 object-contain"
        />
      </div>
      <div className="absolute bottom-1 left-16 flex flex-col items-center">
        {progressBarRow({
          HP: userPokemon.base.HP,
          CurrentHP: userCurrentHP,
          pokemonName: userPokemon.name.english,
          speed: userPokemon.base.Speed,
        })}
      </div>

      {/* Fight Buttons */}
      <div className="flex flex-row gap-4 absolute bottom-1 right-8">
        <GameButton
          title="Attack"
          imageUrl={attackBackground} 
          svg={<img src={gloveIcon} alt="Attack Icon" />} 
          onClick={onAttack}
          disabled={!userTurn || opponentCurrentHP <= 0}
        />
        <GameButton
          title="Catch"
          svg={<img src={pokadexIcon} alt="Pokédex Icon" />} 
          onClick={() => {
            if (canCatchPokemon) {
              opponentPokemon.image.thumbnail = pokadexIcon; 
              onCatch?.(); 
            }
          }}
          disabled={!canCatchPokemon}
        />
      </div>
    </div>
  );
};

export default Arena;