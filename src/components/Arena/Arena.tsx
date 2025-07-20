import { BUTTON_TITLES } from "../../constants/buttonTitles";
import CompetitorPhoto from "./CompetitorPhoto";
import CompetitorProgress from "./CompetitorProgress";
import DialogueBox from "./Dialog";
import FightButton from "./FightButtons";
import { GloveIcon } from "@/assets/GloveIcon";
import { Pokador } from "../../assets/PokadorIcon";
import attackButtonBackground from "../../assets/attackButoonBackground.png";
import { useBattleState } from "../../hooks/useBattleHook";
import EndOfFightModal from "../Modals/EndOfFightModal";
import ChoosePokemonModal from "../Modals/ChoosePokemonModal";
import type { Pokemon } from "../../typs/Pokemon";
import arenaBackground from "../../assets/arenaBackground.png";
import { useState } from "react";

const Arena = ({
  user,
  opponent,
}: {
  user: Pokemon;
  opponent: Pokemon;
}) => {
  const {
    turn,
    userLife,
    opponentLife,
    dialogue,
    winner,
    handleUserAttack,
    handleCatch,
    canCatch,
  } = useBattleState({ userData: user, opponentData: opponent });

  const [showChooseModal, setShowChooseModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(true); 
  const opponentCaught = winner === user.name.english;

  const modalTitle =
    winner === user.name.english
      ? `You caught ${opponent.name.english}!`
      : `${user.name.english} lost the match`;

  const winnerImageUrl =
    winner === user.name.english
      ? opponent.image?.hires || ""
      : user.image?.hires || "";

  const modalDescription = {
    title: winner === user.name.english ? opponent.name.english : user.name.english,
    attributes: [
      {
        label: "Speed",
        value: String(
          winner === user.name.english ? opponent.base.Speed : user.base.Speed
        ),
      },
      {
        label: "Category",
        value:
          winner === user.name.english
            ? opponent.species || "Unknown"
            : user.species || "Unknown",
      },
      {
        label: "Abilities",
        value:
          winner === user.name.english
            ? opponent.profile?.ability?.map((a) => a[0]).join(", ") || "None"
            : user.profile?.ability?.map((a) => a[0]).join(", ") || "None",
      },
    ],
  };

  return (
    <div
      className={`arena-background pb-0 mb-0 relative bg-cover bg-center w-full h-screen`}
      style={{
        backgroundImage: `url(${arenaBackground})`,
      }}
    >
      {/* User Pokémon */}
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
      {/* Fight Buttons */}
      <div className="absolute bottom-5 right-6 flex flex-row gap-6">
        {/* Attack Button */}
        <FightButton
          title={BUTTON_TITLES.ATTACK}
          svg={<GloveIcon />}
          imageUrl={attackButtonBackground}
          onClick={handleUserAttack}
          disabled={turn !== "user"}
        />

        {/* Catch Button */}
        <FightButton
          title={BUTTON_TITLES.CATCH}
          svg={<Pokador />}
          onClick={handleCatch}
          disabled={!canCatch || turn !== "user"}
        />
      </div>

      {/* End of Fight Modal */}
      {winner && showEndModal && (
        <EndOfFightModal
          title={modalTitle}
          winner={winner || ""}
          winnerImageUrl={winnerImageUrl}
          description={modalDescription}
          onPlayAgain={() => {
            setShowEndModal(false); 
            setShowChooseModal(true); 
          }}
          onReturnToMenu={() => window.location.assign("/")}
        />
      )}

      {/* Choose Pokémon Modal */}
      {showChooseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <ChoosePokemonModal
            onSelect={async (pokemon) => {
              setShowChooseModal(false);
              window.location.href = `/arena?id=${pokemon.id}`;
            }}
            onClose={() => setShowChooseModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Arena;