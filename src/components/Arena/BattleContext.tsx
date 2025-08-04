import React, { createContext, useContext, useState, useEffect } from "react";
import { attack, catchOpponent, addPokemon, removePokemon } from "../../api/battelAPI";
import type {BattleData} from "../../typs/BattleData";

type BattleContextProps = {
  battleData: BattleData;
  setBattleData: React.Dispatch<React.SetStateAction<any>>;
  handleAttack: () => Promise<string>;
  handleCatch: () => Promise<string>;
  processBattleOutcome: (battleData: BattleData) => Promise<void>;
};

const BattleContext = createContext<BattleContextProps | undefined>(undefined);

const processBattleOutcome = async (battleData: BattleData) => {
  console.log("Processing battle outcome:", battleData.winner, battleData.isCatched);
  try {
    console.log("the battleData is:", battleData);
    console.log("the if condition is:", battleData.isCatched || battleData.winner === "User");
    if (battleData.isCatched || battleData.winner === "User") {
      console.log("calling addPokemon with userId:", battleData.user._id, "and pokemonId:", battleData.opponent._id);
      await addPokemon(battleData.user._id, battleData.opponent._id);
      console.log(`Added ${battleData.opponent.name.english} to user's collection.`);
    } else if (battleData.winner === "Opponent") {
      await removePokemon(battleData.user._id, battleData.user._id);
      console.log(`Removed ${battleData.user.name.english} from user's collection.`);
    }
  } catch (error) {
    console.error("Error processing battle outcome:", error);
  }
};

export const BattleProvider = ({ children, initialBattleData }: { children: React.ReactNode; initialBattleData: any }) => {
  const [battleData, setBattleData] = useState(initialBattleData);

  useEffect(() => {
    setBattleData(initialBattleData);
  }, [initialBattleData]);

  const handleAttack = async (): Promise<string> => {
    try {
      const updatedData = await attack(battleData._id);
      setBattleData(updatedData);

      if (updatedData.userCurrentLife <= 0) {
        return `${updatedData.user.name.english} fainted!`;
      } else if (updatedData.opponentCurrentLife <= 0) {
        return `${updatedData.opponent.name.english} fainted!`;
      } else {
        return `${updatedData.turn === "user" ? updatedData.user.name.english : updatedData.opponent.name.english} attacks!`;
      }
    } catch (error) {
      return "An error occurred during the attack.";
    }
  };

  const handleCatch = async (): Promise<string> => {
    try {
      const updatedData = await catchOpponent(battleData._id);
      setBattleData(updatedData);

      if (updatedData.isCatched) {
        return `You caught ${updatedData.opponent.name.english}!`;
      } else {
        return `${updatedData.opponent.name.english} avoided the catch!`;
      }
    } catch (error) {
      return "An error occurred during the catch attempt.";
    }
  };

  return (
    <BattleContext.Provider value={{ battleData, setBattleData, handleAttack, handleCatch, processBattleOutcome }}>
      {children}
    </BattleContext.Provider>
  );
};

export const useBattleContext = () => {
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error("useBattleContext must be used within a BattleProvider");
  }
  return context;
};