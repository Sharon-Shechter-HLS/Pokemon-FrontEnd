import { useState, useEffect } from "react";
import { calculateLife } from "../components/utils/lifeCalculate";
import { canCatchPokemon } from "./utils";
import type { Pokemon } from "../typs/Pokemon";

export function useBattleState({
  userData,
  opponentData,
}: {
  userData: Pokemon;
  opponentData: Pokemon;
}) {
  const starter = "user"; 
  const [turn, setTurn] = useState<"user" | "opponent">(starter);
  const [userLife, setUserLife] = useState(userData.base.HP);
  const [opponentLife, setOpponentLife] = useState(opponentData.base.HP);
  const [dialogue, setDialogue] = useState<string>(
    `${userData.name.english} is starting the fight!`
  );
  const [showEndModal, setShowEndModal] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showChooseModal, setShowChooseModal] = useState(false);
  const [canCatchPokemon, setCanCatchPokemon] = useState(0);
  const [isCatching, setIsCatching] = useState(false);
  const [catchAnimationKey, setCatchAnimationKey] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [opponentCaught, setOpponentCaught] = useState(false);

  const canCatch = canCatchPokemon(turn, opponentLife, opponentData); 

  useEffect(() => {
    if (userLife <= 0) {
      setWinner(opponentData.name.english);
      setShowEndModal(true);
      setDialogue(`${userData.name.english} fainted!`);
    } else if (opponentLife <= 0) {
      setWinner(userData.name.english);
      setShowEndModal(true);
      setDialogue(`${opponentData.name.english} fainted!`);
    }
  }, [userLife, opponentLife, userData.name.english, opponentData.name.english]);

  useEffect(() => {
    if (turn === "opponent") {
      const opponentAttackTimeout = setTimeout(() => {
        handleAttack();
      }, 2000);

      return () => clearTimeout(opponentAttackTimeout);
    }
  }, [turn]); 

  const performAttack = async (
    attacker: Pokemon,
    defenderLife: number,
    defenderMaxLife: number,
    setDefenderLife: React.Dispatch<React.SetStateAction<number>>,
    nextTurn: "user" | "opponent",
    nextDialogue: string,
    delay: number
  ) => {
    const newLife = await calculateLife(attacker.base.Speed, defenderLife, defenderMaxLife);
    setTimeout(() => {
      setDefenderLife(newLife);
      setTurn(nextTurn);
      setIsAttacking(false);
      setDialogue(nextDialogue);
    }, delay);
  };

  const handleAttack = async () => {
    setIsAttacking(true);
    if (turn === "user") {
      setDialogue(`${userData.name.english} is attacking!`);
      await performAttack(
        userData,
        opponentLife,
        opponentData.base.HP,
        setOpponentLife,
        "opponent",
        `${opponentData.name.english}'s turn`,
        700
      );
    } else {
      setDialogue(`${opponentData.name.english} is attacking!`);
      await performAttack(
        opponentData,
        userLife,
        userData.base.HP,
        setUserLife,
        "user",
        `${userData.name.english}'s turn`,
        600
      );
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
      setWinner(champion1Data.name.english); 
      setShowEndModal(true);
      setDialogue(`${champion2Data.name.english} was caught!`);
    }, 1200);
  };

  const resetBattle = () => {
    setUserLife(userData.base.HP);
    setOpponentLife(opponentData.base.HP);
    setTurn(starter);
    setDialogue(`${userData.name.english} is starting the fight!`);
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
    setShowEndModal,
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