import CompetitorPhoto from "./CompetitorPhoto";
import CompetitorProgress from "./CompetitorProgress";
import DialogueBox from "./Dialog";
import FightButton from "./FightButtons";
import { AttackButton } from "../../assets/AttackButton";
import { Pokador } from "../../assets/CatchButton";
import attackButtonBackground from "../../assets/attackButoonBackground.png";
import {useBattleState } from "../../hooks/useBattleHook";
import EndOfFightModal from "../Modals/EndOfFightModal";
import ChoosePokemonModal from "../Modals/ChoosePokemonModal";
import type { Pokemon } from "../../typs/Pokemon";

export type ChampionData = {
  id: number;
  name: string;
  speed: number;
  progress: number;
  maxProgress: number;
  imageUrl: string;
};

export type ArenaProps = {
  className?: string;
  champion1Data: ChampionData;
  champion2Data: ChampionData;
};

const Arena = ({
  className = "",
  user,
  opponent,
  starter,
}: {
  className?: string;
  user: Pokemon; // Renamed from champion1Data
  opponent: Pokemon; // Renamed from champion2Data
  starter: "user" | "opponent";
}) => {
  const {
    turn,
    userLife,
    opponentLife,
    dialogue,
    showEndModal,
    winner,
    showChooseModal,
    setShowChooseModal,
    canCatchPokemon,
    handleCatch,
    isCatching,
    catchAnimationKey,
    handleAttack,
  } = useBattleState({ champion1Data: user, champion2Data: opponent, starter }); // Updated hook arguments

  return (
    <div
      className={`arena-background ${className} pb-0 mb-0 relative bg-cover bg-center w-full h-max-[570px]`}
      style={{
        backgroundImage: "url('/arena-background.png')",
      }}
    >
      <div className="min-w-[50%] h-[50%] absolute top-0 right-0 m-2">
        <div className="absolute top-0 right-0 m-3 w-[40%]">
          <CompetitorProgress
            maxLife={user.base.HP} // Updated from champion1Data to user
            currentLife={userLife}
            pokemon={{
              name: user.name.english, // Updated from champion1Data to user
              speed: user.base.Speed, // Updated from champion1Data to user
            }}
            disabled={turn !== "opponent"}
          />
        </div>
        <CompetitorPhoto
          imageUrl={user.image?.hires || ""} // Updated from champion1Data to user
          className={`absolute bottom-14 left-36 ${
            turn === "opponent" && userLife > 0 ? "animate-vibrate" : ""
          }${userLife <= 0 ? "animate-faint-right" : ""}`}
        />
      </div>
      <DialogueBox
        className="w-[40%] h-[17%] relative top-30 justify-center"
        text={dialogue}
      ></DialogueBox>
      <div className="min-w-[50%] h-[50%] absolute bottom-0 left-0 m-2">
        <div className="absolute bottom-0 left-0 m-3 w-[40%]">
          <CompetitorProgress
            maxLife={opponent.base.HP} // Updated from champion2Data to opponent
            currentLife={opponentLife}
            pokemon={{
              name: opponent.name.english, // Updated from champion2Data to opponent
              speed: opponent.base.Speed, // Updated from champion2Data to opponent
            }}
            disabled={turn !== "user"}
          />
        </div>
        <CompetitorPhoto
          imageUrl={opponent.image?.hires || ""} // Updated from champion2Data to opponent
          className={`absolute top-14 right-36 transform scale-x-[-1] ${
            turn === "user" && opponentLife > 0 ? "animate-vibrate" : ""
          }${opponentLife <= 0 ? "animate-faint-right" : ""}`}
        />
      </div>
      {!isCatching && (
        <div className="absolute bottom-5 right-6 flex flex-row gap-6">
          <FightButton
            title="ATTACK"
            svg={<AttackButton />}
            imageUrl={attackButtonBackground}
            onClick={handleAttack}
          />
          <FightButton
            title="CATCH"
            svg={<Pokador />}
            className={
              userLife > 0 && userLife < user.base.HP * 0.3 // Updated from champion1Data to user
                ? "animate-vibrate"
                : ""
            }
            key={canCatchPokemon}
            onClick={handleCatch}
            disabled={turn === "opponent" || !canCatchPokemon}
          />
        </div>
      )}
      {isCatching && (
        <div
          key={catchAnimationKey}
          className="fixed left-1/2 top-1/2 z-50 pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            animation: `pokador-catch-move 1.2s cubic-bezier(0.4,0,0.2,1) forwards`,
          }}
        >
          <div>
            <Pokador size={200} />
          </div>
        </div>
      )}
      {showEndModal && (
        <EndOfFightModal
          title={
            winner === user.name.english // Updated from champion1Data to user
              ? `${opponent.name.english} Lost the match` // Updated from champion2Data to opponent
              : `You Caught ${opponent.name.english}!` // Updated from champion2Data to opponent
          }
          winner={winner || ""}
          winnerImageUrl={
            winner === user.name.english // Updated from champion1Data to user
              ? opponent.image?.hires || "" // Updated from champion2Data to opponent
              : user.image?.hires || "" // Updated from champion1Data to user
          }
          description={
            winner !== user.name.english // Updated from champion1Data to user
              ? {
                  title: opponent.name.english, // Updated from champion2Data to opponent
                  attributes: [
                    { label: "Speed", value: String(opponent.base.Speed) }, // Updated from champion2Data to opponent
                    { label: "Category", value: opponent.species || "?" }, // Updated from champion2Data to opponent
                    {
                      label: "Abilities",
                      value:
                        opponent.profile?.ability
                          ?.map((a) => a[0])
                          .join(", ") || "", // Updated from champion2Data to opponent
                    },
                  ],
                }
              : undefined
          }
          onPlayAgain={() => setShowChooseModal(true)}
          onReturnToMenu={() => window.location.assign("/")}
        />
      )}
      {showChooseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <ChoosePokemonModal
            onSelect={async (pokemon) => {
              setShowChooseModal(false);
              window.location.href = `/arena?userId=${pokemon.id}`;
            }}
            onClose={() => setShowChooseModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Arena;