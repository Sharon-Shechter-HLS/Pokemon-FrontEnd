import { useState } from "react";
import type { Pokemon } from "../typs/Pokemon";
import axios from "axios";

export function useBattleState(battelState: {
  _id: string;
  user: Pokemon;
  opponent: Pokemon;
  turn: string;
  userCurrentLife: number;
  opponentCurrentLife: number;
  winner: string;
  catchAttempts: number;
  canCatch: boolean;
  updateGameData: (updatedData: any) => void; 
}) {

  // User attacks opponent
  const handleAttack = async () => {
    console.log("User attacking opponent:", battelState.opponent.name.english);
    
    try {
      const response = await axios.post("http://localhost:3000/arena/attack", {
        gameId: battelState._id,
      });
      battelState.updateGameData(response.data); 
    } catch (error) {
      console.error("Failed to perform attack:", error);
    }
  };

  // User attempts to catch the opponent
  const handleCatch = async () => {
    console.log("Attempting to catch opponent:", battelState.opponent.name.english);
    try {
      const response = await axios.post("http://localhost:3000/arena/catch", {
        gameId: battelState._id,
      });
      battelState.updateGameData(response.data);
    } catch (error) {
      console.error("Failed to catch opponent:", error);
    }
  };

  return {
    handleAttack,
    handleCatch,
  };
}