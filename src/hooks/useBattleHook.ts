import { useState, useEffect } from "react";
import { calculateLife } from "../components/utils/lifeCalculate";
import type { Pokemon } from "../typs/Pokemon";

export function useBattleState({
  champion1Data,
  champion2Data,
  starter,
}: {
  champion1Data: Pokemon;
  champion2Data: Pokemon;
  starter: "user" | "opponent";
}) {
  const [turn, setTurn] = useState<"user" | "opponent">(starter);
  const [userLife, setUserLife] = useState(champion1Data.base.HP); 
  const [opponentLife, setOpponentLife] = useState(champion2Data.base.HP); 
  const [dialogue, setDialogue] = useState<string>(
    starter === "user"
      ? `${champion1Data.name.english} is starting the fight!` 
      : `${champion2Data.name.english} is starting the fight!`
  );
  const [showEndModal, setShowEndModal] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showChooseModal, setShowChooseModal] = useState(false);
  const [isCatching, setIsCatching] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [opponentCaught, setOpponentCaught] = useState(false);

  const canCatchPokemon =
    turn === "user" && opponentLife > 0 && opponentLife < champion2Data.base.HP * 0.8; 
  useEffect(() => {
    if (userLife <= 0) {
      setWinner(champion2Data.name.english);
      setShowEndModal(true);
      setDialogue(`${champion1Data.name.english} fainted!`);
    } else if (opponentLife <= 0) {
      setWinner(champion1Data.name.english);
      setShowEndModal(true);
      setDialogue(`${champion2Data.name.english} fainted!`);
    }
  }, [userLife, opponentLife, champion1Data.name.english, champion2Data.name.english]);

  const handleAttack = async () => {
    setIsAttacking(true);
    setDialogue(
      turn === "user"
        ? `${champion1Data.name.english} is attacking!` 
        : `${champion2Data.name.english} is attacking!` 
    );

    if (turn === "user") {
      const newLife = await calculateLife(
        champion1Data.base.Speed, 
        opponentLife,            
        champion2Data.base.HP    
      );
      setTimeout(() => {
        setOpponentLife(newLife);
        setTurn("opponent");
        setIsAttacking(false);
        setDialogue(`${champion2Data.name.english}'s turn`);
      }, 700);
    } else {
      const newLife = await calculateLife(
        champion2Data.base.Speed, 
        userLife,                 
        champion1Data.base.HP     
      );
      setTimeout(() => {
        setUserLife(newLife);
        setTurn("user");
        setIsAttacking(false);
        setDialogue(`${champion1Data.name.english}'s turn`);
      }, 600);
    }
  };

  const handleCatch = () => {
  setOpponentCaught(true); 
  setWinner(champion1Data.name.english);
  setDialogue(`${champion2Data.name.english} was caught!`);

  // Add a 2-second delay before showing the end modal
  setTimeout(() => {
    setShowEndModal(true);
  }, 2000); // 2 seconds delay
};

  const resetBattle = () => {
    setUserLife(champion1Data.base.HP);
    setOpponentLife(champion2Data.base.HP);
    setTurn(starter);
    setDialogue(
      starter === "user"
        ? `${champion1Data.name.english} is starting the fight!`
        : `${champion2Data.name.english} is starting the fight!`
    );
    setShowEndModal(false);
    setWinner(null);
    setShowChooseModal(false);
    setIsCatching(false);
    setIsAttacking(false);
    setOpponentCaught(false);
  };

  return {
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
    resetBattle,
    isAttacking,
    opponentCaught,
  };
}