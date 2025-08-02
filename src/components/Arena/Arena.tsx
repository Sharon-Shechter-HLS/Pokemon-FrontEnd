import { useEffect, useState } from "react";
import { BUTTON_TITLES } from "../../constants/buttonTitles";
import CompetitorPhoto from "./CompetitorPhoto";
import CompetitorProgress from "./CompetitorProgress";
import DialogueBox from "./Dialog";
import FightButton from "./FightButtons";
import EndOfFightModal from "../Modals/EndOfFightModal";
import { useBattleState } from "../../hooks/useBattleHook";
import { GloveIcon } from "@/assets/GloveIcon";
import { Pokador } from "../../assets/PokadorIcon";
import attackButtonBackground from "../../assets/attackButoonBackground.png";
import arenaBackground from "../../assets/arenaBackground.png";

const Arena = ({ battleData }: { battleData: any }) => {
  const [userCurrentLife, setUserCurrentLife] = useState(battleData.userCurrentLife);
  const [opponentCurrentLife, setOpponentCurrentLife] = useState(battleData.opponentCurrentLife);
  const [turn, setTurn] = useState(battleData.turn);
  const [winner, setWinner] = useState(battleData.winner);
  const [catchAttempts, setCatchAttempts] = useState(battleData.catchAttempts);
  const [canCatch, setCanCatch] = useState(battleData.canCatch);
  const [dialogue, setDialogue] = useState(`${battleData.user.name.english} is starting the fight!`);

  const {  handleAttack, handleCatch } = useBattleState({
    _id: battleData._id,
    user: battleData.user,
    opponent: battleData.opponent,
    turn,
    userCurrentLife,
    opponentCurrentLife,
    winner,
    catchAttempts,
    canCatch,
    updateGameData: (updatedData) => {
      setUserCurrentLife(updatedData.userCurrentLife);
      setOpponentCurrentLife(updatedData.opponentCurrentLife);
      setTurn(updatedData.turn);
      setWinner(updatedData.winner);
      setCatchAttempts(updatedData.catchAttempts);
      setCanCatch(updatedData.canCatch);
      setDialogue(
        updatedData.winner
          ? updatedData.winner === battleData.user.name.english
            ? `${battleData.opponent.name.english} was caught!`
            : `${battleData.user.name.english} fainted!`
          : `${updatedData.turn === "user" ? battleData.user.name.english : battleData.opponent.name.english}'s turn`
      );
    },
  });

  // Automatically trigger opponent attack after 2 seconds if it's the opponent's turn
  useEffect(() => {
    if (turn === "opponent") {
      const timer = setTimeout(() => {
        handleAttack();
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [turn, handleAttack]);

  const modalTitle =
    winner === battleData.user.name.english
      ? `You caught ${battleData.opponent.name.english}!`
      : `${battleData.user.name.english} lost the match`;

  const winnerImageUrl =
    winner === battleData.user.name.english
      ? battleData.opponent.image?.hires || ""
      : battleData.user.image?.hires || "";

  const modalDescription = {
    title: winner === battleData.user.name.english
      ? battleData.opponent.name.english
      : battleData.user.name.english,
    attributes: [
      {
        label: "Speed",
        value: String(
          winner === battleData.user.name.english
            ? battleData.opponent.base.Speed
            : battleData.user.base.Speed
        ),
      },
      {
        label: "Category",
        value:
          winner === battleData.user.name.english
            ? battleData.opponent.species || "Unknown"
            : battleData.user.species || "Unknown",
      },
      {
        label: "Abilities",
        value:
          winner === battleData.user.name.english
            ? battleData.opponent.profile?.ability?.map((a) => a[0]).join(", ") || "None"
            : battleData.user.profile?.ability?.map((a) => a[0]).join(", ") || "None",
      },
    ],
  };

  return (
    console.log("Rendering Arena with battleData:", battleData),
    <div
      className={`arena-background pb-0 mb-0 relative bg-cover bg-center w-full h-screen`}
      style={{
        backgroundImage: `url(${arenaBackground})`,
      }}
    >
      {/* User Pokémon */}
      <div className="min-w-[50%] h-[50%] absolute bottom-0 left-0 m-2">
        <CompetitorProgress
          maxLife={battleData.user.base.HP}
          currentLife={userCurrentLife}
          pokemon={{
            name: battleData.user.name.english,
            speed: battleData.user.base.Speed,
          }}
          disabled={turn !== "user"}
        />
        <CompetitorPhoto
          imageUrl={battleData.user.image?.hires || ""}
          className={`absolute top-1 right-20 scale-[0.6] ${
            turn === "user" && userCurrentLife > 0 ? "animate-vibrate" : ""
          } ${userCurrentLife <= 0 ? "animate-faint-left" : ""}`}
        />
      </div>

      {/* Opponent Pokémon */}
      <div className="min-w-[50%] h-[50%] absolute top-0 right-0 m-2">
        <CompetitorProgress
          maxLife={battleData.opponent.base.HP}
          currentLife={opponentCurrentLife}
          pokemon={{
            name: battleData.opponent.name.english,
            speed: battleData.opponent.base.Speed,
          }}
          disabled={turn !== "opponent"}
        />
        <CompetitorPhoto
          imageUrl={battleData.opponent.image?.hires || ""}
          className={`absolute bottom-1 left-40 transform scale-[0.5] ${
            turn === "opponent" && opponentCurrentLife > 0 ? "animate-vibrate" : ""
          } ${opponentCurrentLife <= 0 ? "animate-faint-right" : ""}`}
        />
      </div>

      <DialogueBox text={dialogue} />

      {/* Fight Buttons */}
      <div className="absolute bottom-5 right-6 flex flex-row gap-6">
        <FightButton
          title={BUTTON_TITLES.ATTACK}
          svg={<GloveIcon />}
          imageUrl={attackButtonBackground}
          onClick={handleAttack}
          disabled={turn !== "user"}
        />
        <FightButton
          title={BUTTON_TITLES.CATCH}
          svg={<Pokador />}
          onClick={handleCatch}
          disabled={!canCatch || turn !== "user"}
        />
      </div>

      {/* End of Fight Modal */}
      {winner && winner !== "None" && (
        console.log("Winner detected:", winner),
        console.log("Showing EndOfFightModal with winner:", winner),
        <EndOfFightModal
          title={modalTitle}
          winner={winner || ""}
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