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
  userData: ChampionData;
  opponentData: ChampionData;
};

const Arena = ({
  className = "",
  user: userData,
  opponent: opponentData,
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
  } = useBattleState({ champion1Data: userData, champion2Data: opponentData, starter });

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
            maxLife={userData.base.HP}
            currentLife={userLife}
            pokemon={{
              name: userData.name.english,
              speed: userData.base.Speed,
            }}
            disabled={turn !== "user"}
          />
        </div>
        <CompetitorPhoto
          imageUrl={userData.image?.hires || ""}
          className={`absolute top-1 right-20 scale-[0.6]`}
        />
      </div>

      {/* Opponent Pokémon */}
      <div className="min-w-[50%] h-[50%] absolute top-0 right-0 m-2">
        <div className="absolute top-0 right-0 m-3 w-[40%]">
          <CompetitorProgress
            maxLife={opponentData.base.HP}
            currentLife={opponentLife}
            pokemon={{
              name: opponentData.name.english,
              speed: opponentData.base.Speed,
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
            imageUrl={opponentData.image?.hires || ""}
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
            winner === userData.name.english
              ? `You caught ${opponentData.name.english}!` 
              : `${userData.name.english} lost the match` 
          }
          winner={winner || ""}
          winnerImageUrl={
            winner === userData.name.english
              ? opponentData.image?.hires || "" 
              : userData.image?.hires || "" 
          }
          description={{
            title: winner === userData.name.english ? opponentData.name.english : userData.name.english,
            attributes: [
              {
                label: "Speed",
                value: String(winner === userData.name.english ? opponentData.base.Speed : userData.base.Speed),
              },
              {
                label: "Category",
                value: winner === userData.name.english ? opponentData.species || "Unknown" : userData.species || "Unknown",
              },
              {
                label: "Abilities",
                value:
                  winner === userData.name.english
                    ? opponentData.profile?.ability?.map((a) => a[0]).join(", ") || "None"
                    : userData.profile?.ability?.map((a) => a[0]).join(", ") || "None",
              },
            ],
          }}
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