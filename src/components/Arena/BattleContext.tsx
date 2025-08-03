import React, { createContext, useContext, useState, useEffect } from "react";
import { attack, catchOpponent } from "../../api/battelAPI";

type BattleContextProps = {
  battleData: any;
  setBattleData: React.Dispatch<React.SetStateAction<any>>;
  handleAttack: () => Promise<string>;
  handleCatch: () => Promise<string>;
};

const BattleContext = createContext<BattleContextProps | undefined>(undefined);

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
    <BattleContext.Provider value={{ battleData, setBattleData, handleAttack, handleCatch }}>
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