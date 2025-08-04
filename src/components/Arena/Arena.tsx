import { useEffect, useState } from "react";
import { BUTTON_TITLES } from "../../constants/buttonTitles";
import CompetitorPhoto from "./CompetitorPhoto";
import CompetitorProgress from "./CompetitorProgress";
import DialogueBox from "./Dialog";
import FightButton from "./FightButtons";
import EndOfFightModal from "../Modals/EndOfFightModal";
import { GloveIcon } from "@/assets/GloveIcon";
import { Pokador } from "../../assets/PokadorIcon";
import attackButtonBackground from "../../assets/attackButoonBackground.png";
import arenaBackground from "../../assets/arenaBackground.png";
import { useBattleContext } from "./BattleContext";
import ChoosePokemonModal from "../Modals/ChoosePokemonModal";
import { startNewBattle } from "../../api/battelAPI";
import type { BattleData } from "../../typs/BattleData";


type ArenaProps = {
  onStartNewBattle: (newBattleData: BattleData, showVSComponent?: boolean) => void; 
};

const Arena = ({ onStartNewBattle }: ArenaProps) => {
  const { battleData, setBattleData, handleAttack, handleCatch, processBattleOutcome } = useBattleContext();
  const [dialogue, setDialogue] = useState(`${battleData.user.name.english} starts the fight!`);
  const [showChoosePokemonModal, setShowChoosePokemonModal] = useState(false);
  const [hasProcessedOutcome, setHasProcessedOutcome] = useState(false);

  useEffect(() => {
    if (battleData.hasSwitch) {
      setDialogue(`${battleData.user.name.english} has entered the battlefield`);
    } else {
      setDialogue(`${battleData.user.name.english} starts the fight!`);
    }
  }, [battleData.hasSwitch]);

  useEffect(() => {
    const handleOpponentAttack = async () => {
      if (battleData.isCatched) {
        return;
      }

      if (battleData.turn === "opponent") {
        try {
          const fightStatus = await handleAttack();
          setDialogue(fightStatus);
        } catch (error) {
          console.error("Error during opponent attack:", error);
        }
      }
    };
    handleOpponentAttack();
  }, [battleData.turn]);

  useEffect(() => {
    const processOutcome = async () => {
      if (battleData.winner || battleData.isCatched) {
        await processBattleOutcome(battleData);
        setHasProcessedOutcome(true); 
      }
    };

    processOutcome();
  }, [battleData.winner, battleData.isCatched]);

  const handleUserAction = async () => {
    try {
      const fightStatus = await handleAttack();
      setDialogue(fightStatus);
    } catch (error) {
      console.error("Error during user action:", error);
    }
  };

  const handleCatchAction = async () => {
    try {
      const catchStatus = await handleCatch();
      setDialogue(catchStatus);
      if (battleData.isCatched) {
        setDialogue(`You caught ${battleData.opponent.name.english}!`);
      }
    } catch (error) {
      console.error("Error during catch action:", error);
    }
  };

  const handlePlayAgain = async () => {
    try {
      const response = await startNewBattle(battleData.user._id);
      setBattleData(response);
      setDialogue(`${response.user.name.english} starts the fight!`);
      onStartNewBattle(response, false);
    } catch (error) {
      console.error("Error during play again:", error);
    }
  };

  const handleSwitchPokemon = () => {
    setShowChoosePokemonModal(true);
  };

  const handleReturnToMenu = () => {
    window.location.assign("/all-pokemons");
  };

  return (
    <div
      className="arena-background pb-0 mb-0 relative bg-cover bg-center w-full h-screen"
      style={{
        backgroundImage: `url(${arenaBackground})`,
      }}
    >
      {/* User Pokémon */}
      <div className="min-w-[50%] h-[50%] absolute bottom-0 left-0 m-2">
        <div className="absolute bottom-0 left-0 m-3 w-[40%]">
          <CompetitorProgress
            maxLife={battleData.user.base.HP}
            currentLife={battleData.userCurrentLife}
            pokemon={{
              name: battleData.user.name.english,
              speed: battleData.user.base.Speed,
            }}
            disabled={battleData.turn !== "user"}
          />
        </div>
        <CompetitorPhoto
          imageUrl={battleData.user.image?.hires || ""}
          className={`absolute top-20 right-50 scale-[1] ${
            battleData.turn === "user" && battleData.userCurrentLife > 0 ? "animate-vibrate" : ""
          } ${battleData.userCurrentLife <= 0 ? "animate-faint-left" : ""}`}
        />
      </div>

      {/* Opponent Pokémon */}
      <div className="min-w-[50%] h-[50%] absolute top-0 right-0 m-2">
        <div className="absolute top-0 right-0 m-3 w-[40%]">
          <CompetitorProgress
            maxLife={battleData.opponent.base.HP}
            currentLife={battleData.opponentCurrentLife}
            pokemon={{
              name: battleData.opponent.name.english,
              speed: battleData.opponent.base.Speed,
            }}
            disabled={battleData.turn !== "opponent"}
          />
        </div>
        {battleData.isCatched ? (
          <div
            key={battleData.opponent.name.english}
            className="fixed z-50 pointer-events-none"
            style={{
              left: "10%",
              top: "10%",
              transform: "translate(-50%, -50%)",
              animation: `pokador-catch-move 1.2s cubic-bezier(0.4,0,0.2,1) forwards`,
            }}
          >
            <Pokador size={200} />
          </div>
        ) : (
          <CompetitorPhoto
            imageUrl={battleData.opponent.image?.hires || ""}
            className={`absolute top-20 left-50 scale-[1] ${
              battleData.turn === "opponent" && battleData.opponentCurrentLife > 0 ? "animate-vibrate" : ""
            } ${battleData.opponentCurrentLife <= 0 ? "animate-faint-right" : ""}`}
          />
        )}
      </div>

      {/* Dialogue Box */}
      <DialogueBox
        className="w-[40%] h-[17%] relative top-30 justify-center"
        text={dialogue}
      />

      {/* Fight Buttons */}
      <div className="absolute bottom-5 right-6 flex flex-row gap-6">
        {/* Attack Button */}
        <FightButton
          title={BUTTON_TITLES.ATTACK}
          svg={<GloveIcon />}
          imageUrl={attackButtonBackground}
          onClick={handleUserAction}
          disabled={battleData.turn !== "user"}
        />

        {/* Catch Button */}
        <FightButton
          title={BUTTON_TITLES.CATCH}
          svg={<Pokador />}
          onClick={handleCatchAction}
          disabled={!battleData.canCatch || battleData.turn !== "user"}
        />
      </div>

      {/* End of Fight Modal */}
      {(battleData.winner || battleData.isCatched) && hasProcessedOutcome && !showChoosePokemonModal && (
        <EndOfFightModal
          title={
            battleData.isCatched
              ? `You caught ${battleData.opponent.name.english}!`
              : battleData.winner === battleData.user.name.english
              ? `You won ${battleData.opponent.name.english}!`
              : `${battleData.user.name.english} lost the match`
          }
          winner={battleData.winner || ""}
          winnerImageUrl={
            battleData.isCatched
              ? battleData.opponent.image?.hires || ""
              : battleData.winner === battleData.user.name.english
              ? battleData.opponent.image?.hires || ""
              : battleData.user.image?.hires || ""
          }
          description={{
            title: battleData.opponent.name.english,
            attributes: [
              { label: "Speed", value: battleData.opponent.base.Speed.toString() },
              { label: "Category", value: battleData.opponent.species || "Unknown" },
              {
                label: "Abilities",
                value: battleData.opponent.profile?.ability?.map((a: string[]) => a[0]).join(", ") || "None",
              },
            ],
          }}
          onPlayAgain={handlePlayAgain}
          onReturnToMenu={handleReturnToMenu}
          onSwitchPokemon={battleData.userCurrentLife <= 0 ? handleSwitchPokemon : undefined}
        />
      )}

      {/* Choose Pokémon Modal */}
      {showChoosePokemonModal && (
        <ChoosePokemonModal
          onClose={() => setShowChoosePokemonModal(false)} 
        />
      )}
    </div>
  );
};

export default Arena;