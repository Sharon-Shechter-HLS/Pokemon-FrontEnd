import React, { createContext, useContext, useState } from "react";
import { attack, catchOpponent } from "../../api/battelAPI";

interface BattleContextProps {
  battleData: any;
  setBattleData: React.Dispatch<React.SetStateAction<any>>;
  handleUserAttack: () => Promise<void>;
  handleCatch: () => Promise<void>;
}

const BattleContext = createContext<BattleContextProps | undefined>(undefined);

export const BattleProvider = ({ children, initialBattleData }: { children: React.ReactNode; initialBattleData: any }) => {
  const [battleData, setBattleData] = useState(initialBattleData);

  const handleUserAttack = async () => {
    try {
      const updatedData = await attack(battleData._id);
      setBattleData(updatedData);
    } catch (error) {
      console.error("Failed to perform user attack:", error);
    }
  };

  const handleCatch = async () => {
    try {
      const updatedData = await catchOpponent(battleData._id);
      setBattleData(updatedData);
    } catch (error) {
      console.error("Failed to catch opponent:", error);
    }
  };

  return (
    <BattleContext.Provider value={{ battleData, setBattleData, handleUserAttack, handleCatch }}>
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