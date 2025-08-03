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

const Arena = () => {
  const { battleData, handleUserAttack, handleCatch } = useBattleContext();
  const [dialogue, setDialogue] = useState(`${battleData.user.name.english} is starting the fight!`);

  useEffect(() => {
    if (battleData.turn === "opponent") {
      const timer = setTimeout(async () => {
        try {
          await handleUserAttack();
          setDialogue(`${battleData.opponent.name.english} attacked!`);
        } catch (error) {
          console.error("Failed to perform opponent attack:", error);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [battleData.turn]);

  const modalTitle =
    battleData.winner === battleData.user.name.english
      ? `You caught ${battleData.opponent.name.english}!`
      : `${battleData.user.name.english} lost the match`;

  const winnerImageUrl =
    battleData.winner === battleData.user.name.english
      ? battleData.opponent.image?.hires || ""
      : battleData.user.image?.hires || "";

  const modalDescription = {
    title: battleData.winner === battleData.user.name.english
      ? battleData.opponent.name.english
      : battleData.user.name.english,
    attributes: [
      {
        label: "Speed",
        value: String(
          battleData.winner === battleData.user.name.english
            ? battleData.opponent.base.Speed
            : battleData.user.base.Speed
        ),
      },
      {
        label: "Category",
        value:
          battleData.winner === battleData.user.name.english
            ? battleData.opponent.species || "Unknown"
            : battleData.user.species || "Unknown",
      },
      {
        label: "Abilities",
        value:
          battleData.winner === battleData.user.name.english
            ? battleData.opponent.profile?.ability?.map((a) => a[0]).join(", ") || "None"
            : battleData.user.profile?.ability?.map((a) => a[0]).join(", ") || "None",
      },
    ],
  };

  const opponentCaught = battleData.winner === battleData.user.name.english;

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
          className={`absolute top-1 right-20 scale-[0.6] ${
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
        {opponentCaught ? (
          <div
            key={battleData.opponent.name.english}
            className="fixed left-1/2 top-1/2 z-50 pointer-events-none"
            style={{
              transform: "translate(-50%, -50%)",
              animation: `pokador-catch-move 1.2s cubic-bezier(0.4,0,0.2,1) forwards`,
            }}
          >
            <Pokador size={200} />
          </div>
        ) : (
          <CompetitorPhoto
            imageUrl={battleData.opponent.image?.hires || ""}
            className={`absolute bottom-1 left-40 transform scale-[0.5] ${
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
          onClick={handleUserAttack}
          disabled={battleData.turn !== "user"}
        />

        {/* Catch Button */}
        <FightButton
          title={BUTTON_TITLES.CATCH}
          svg={<Pokador />}
          onClick={handleCatch}
          disabled={!battleData.canCatch || battleData.turn !== "user"}
        />
      </div>

      {/* End of Fight Modal */}
      {battleData.winner && (
        <EndOfFightModal
          title={modalTitle}
          winner={battleData.winner || ""}
          winnerImageUrl={winnerImageUrl}
          description={modalDescription}
          onPlayAgain={() => window.location.reload()}
          onReturnToMenu={() => window.location.assign("/")}
        />
      )}
    </div>
  );
};

export default Arena;