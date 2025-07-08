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
      ? `${champion2Data.name.english} is starting the fight!`
      : `${champion1Data.name.english} is starting the fight!`
  );
  const [showEndModal, setShowEndModal] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showChooseModal, setShowChooseModal] = useState(false);
  const [canCatchPokemon, setCanCatchPokemon] = useState(0);
  const [isCatching, setIsCatching] = useState(false);
  const [catchAnimationKey, setCatchAnimationKey] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (
      userLife > 0 &&
      userLife < champion1Data.base.HP * 0.3 &&
      turn === "user"
    ) {
      interval = setInterval(() => {
        setCanCatchPokemon((tick) => tick + 1);
      }, 500);
    } else {
      setCanCatchPokemon(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [userLife, champion1Data.base.HP, turn]);

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
        ? `${champion2Data.name.english} is attacking!`
        : `${champion1Data.name.english} is attacking!`
    );

    if (turn === "user") {
      const newLife = await calculateLife(
        champion2Data.base.Speed, // Power
        opponentLife,            // Current Life
        champion2Data.base.HP    // Max Life
      );
      setTimeout(() => {
        setOpponentLife(newLife);
        setTurn("opponent");
        setIsAttacking(false);
        setDialogue(`${champion1Data.name.english}'s turn`);
      }, 700);
    } else {
      const newLife = await calculateLife(
        champion1Data.base.Speed, // Power
        userLife,                 // Current Life
        champion1Data.base.HP     // Max Life
      );
      setTimeout(() => {
        setUserLife(newLife);
        setTurn("user");
        setIsAttacking(false);
        setDialogue(`${champion2Data.name.english}'s turn`);
      }, 600);
    }
  };

  const handleCatch = () => {
    if (!canCatchPokemon) {
      setDialogue("The Pokémon got away!");
      return;
    }
    setIsCatching(true);
    setCatchAnimationKey((key) => key + 1);
    setTimeout(() => {
      setIsCatching(false);
      setWinner(champion1Data.name.english); // User caught the opponent's Pokémon
      setShowEndModal(true);
      setDialogue(`${champion2Data.name.english} was caught!`);
    }, 1200);
  };

  const resetBattle = () => {
    setUserLife(champion1Data.base.HP);
    setOpponentLife(champion2Data.base.HP);
    setTurn(starter);
    setDialogue(
      starter === "user"
        ? `${champion2Data.name.english} is starting the fight!`
        : `${champion1Data.name.english} is starting the fight!`
    );
    setShowEndModal(false);
    setWinner(null);
    setShowChooseModal(false);
    setCanCatchPokemon(0);
    setIsCatching(false);
    setCatchAnimationKey(0);
    setIsAttacking(false);
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
    catchAnimationKey,
    handleAttack,
    resetBattle,
    isAttacking,
  };
}