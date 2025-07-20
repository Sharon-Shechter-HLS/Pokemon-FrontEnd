import { useState, useEffect } from "react";
import { canCatchPokemon, attemptCatch, calculateLife } from "./utils";
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
  const [winner, setWinner] = useState<string | null>(null);
  const [catchAttempts, setCatchAttempts] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);

  // Check for game end conditions
  useEffect(() => {
    if (userLife <= 0) {
      setWinner(opponentData.name.english);
      setDialogue(`${userData.name.english} fainted!`);
    } else if (opponentLife <= 0) {
      setWinner(userData.name.english);
      setDialogue(`${opponentData.name.english} fainted!`);
    }
  }, [userLife, opponentLife, userData.name.english, opponentData.name.english]);

  // Handle opponent's turn
  useEffect(() => {
    if (turn === "opponent") {
      const opponentAttackTimeout = setTimeout(() => {
        handleOpponentAttack();
      }, 2000);

      return () => clearTimeout(opponentAttackTimeout);
    }
  }, [turn]);

  // Perform attack logic
  const performAttack = async (
    attacker: Pokemon,
    defenderLife: number,
    defenderMaxLife: number,
    setDefenderLife: React.Dispatch<React.SetStateAction<number>>,
    nextTurn: "user" | "opponent",
    nextDialogue: string,
    delay?: number
  ) => {
    const newLife = await calculateLife(attacker.base.Speed, defenderLife, defenderMaxLife);
    setTimeout(() => {
      setDefenderLife(newLife);
      setTurn(nextTurn);
      setIsAttacking(false);
      setDialogue(nextDialogue);
    }, delay);
  };

  // User attacks opponent
  const handleUserAttack = async () => {
    if (turn !== "user") return;
    setIsAttacking(true);
    setDialogue(`${userData.name.english} is attacking!`);
    await performAttack(
      userData,
      opponentLife,
      opponentData.base.HP,
      setOpponentLife,
      "opponent",
      `${opponentData.name.english}'s turn`,
      
    );
  };

  // Opponent attacks user
  const handleOpponentAttack = async () => {
    setIsAttacking(true);
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
  };

  // User attempts to catch the opponent
  const handleCatch = () => {
    if (turn !== "user" || catchAttempts >= 3) return;

    const { success, updatedAttempts } = attemptCatch(catchAttempts);

    setCatchAttempts(updatedAttempts);
      if (success) {
        setWinner(userData.name.english);
        setDialogue(`${opponentData.name.english} was caught!`);
      } else {
        setDialogue("The Pokémon got away!");
        setTurn("opponent");
      }
  };

  const canCatch = canCatchPokemon(turn, catchAttempts);

  return {
    turn,
    userLife,
    opponentLife,
    dialogue,
    winner,
    handleUserAttack,
    handleCatch,
    isAttacking,
    catchAttempts,
    canCatch,
  };
}