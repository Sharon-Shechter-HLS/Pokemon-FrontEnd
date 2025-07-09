import CompetitorPhoto from "./CompetitorPhoto";
import CompetitorProgress from "./CompetitorProgress";
import DialogueBox from "./Dialog";
import FightButton from "./FightButtons";
import { AttackButton } from "../../assets/AttackButton";
import { Pokador } from "../../assets/CatchButton";
import attackButtonBackground from "../../assets/attackButoonBackground.png";
import { useBattleState } from "../../hooks/useBattleHook";
import EndOfFightModal from "../Modals/EndOfFightModal";
import ChoosePokemonModal from "../Modals/ChoosePokemonModal";
import type { Pokemon } from "../../typs/Pokemon";
import arenaBackground from "../../assets/arenaBackground.png";
import { useEffect } from "react";

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
  user: Pokemon;
  opponent: Pokemon;
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
    handleAttack,
    opponentCaught, 
  } = useBattleState({ champion1Data: user, champion2Data: opponent, starter });

  
  useEffect(() => {
    if (turn === "opponent") {
      const opponentAttackTimeout = setTimeout(() => {
        handleAttack();
      }, 2000); // 2 seconds delay

      return () => clearTimeout(opponentAttackTimeout);
    }
  }, [turn, handleAttack]);

  return (
    <div
      className={`arena-background ${className} pb-0 mb-0 relative bg-cover bg-center w-full h-screen`}
      style={{
        backgroundImage: `url(${arenaBackground})`,
      }}
    >
      {/* User Pokémon  */}
      <div className="min-w-[50%] h-[50%] absolute bottom-0 left-0 m-2">
        <div className="absolute bottom-0 left-0 m-3 w-[40%]">
          <CompetitorProgress
            maxLife={user.base.HP}
            currentLife={userLife}
            pokemon={{
              name: user.name.english,
              speed: user.base.Speed,
            }}
            disabled={turn !== "user"}
          />
        </div>
        <CompetitorPhoto
          imageUrl={user.image?.hires || ""}
          className={`absolute top-1 right-20 scale-[0.6]`}
        />
      </div>

      {/* Opponent Pokémon */}
      <div className="min-w-[50%] h-[50%] absolute top-0 right-0 m-2">
        <div className="absolute top-0 right-0 m-3 w-[40%]">
          <CompetitorProgress
            maxLife={opponent.base.HP}
            currentLife={opponentLife}
            pokemon={{
              name: opponent.name.english,
              speed: opponent.base.Speed,
            }}
            disabled={turn !== "opponent"}
          />
        </div>
        {opponentCaught ? (
          <Pokador
            size={200} 
            className="absolute bottom-28 left-60 transform scale-[1]"
          />
        ) : (
          <CompetitorPhoto
            imageUrl={opponent.image?.hires || ""}
            className={`absolute bottom-1 left-30 transform scale-[0.5]`}
          />
        )}
      </div>
      <DialogueBox
        className="w-[40%] h-[17%] relative top-30 justify-center"
        text={dialogue}
      ></DialogueBox>
      {!isCatching && (
        <div className="absolute bottom-5 right-6 flex flex-row gap-6">
          <FightButton
            title="ATTACK"
            svg={<AttackButton />}
            imageUrl={attackButtonBackground}
            onClick={handleAttack}
            disabled={turn !== "user"}
          />
          <FightButton
            title="CATCH"
            svg={<Pokador />}
            onClick={handleCatch}
            disabled={!canCatchPokemon} 
          />
        </div>
      )}
     
      {showEndModal && (
        <EndOfFightModal
          title={
            winner === user.name.english
              ? `${opponent.name.english} Lost the match`
              : `You Caught ${opponent.name.english}!`
          }
          winner={winner || ""}
          winnerImageUrl={
            winner === user.name.english
              ? opponent.image?.hires || ""
              : user.image?.hires || ""
          }
          description={
            winner !== user.name.english
              ? {
                  title: opponent.name.english,
                  attributes: [
                    { label: "Speed", value: String(opponent.base.Speed) },
                    { label: "Category", value: opponent.species || "?" },
                    {
                      label: "Abilities",
                      value:
                        opponent.profile?.ability
                          ?.map((a) => a[0])
                          .join(", ") || "",
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