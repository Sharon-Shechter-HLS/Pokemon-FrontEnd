import type { Pokemon } from "./Pokemon";

export type BattleData = {
  _id: string;
  user: Pokemon; 
  opponent: Pokemon; 
  userCurrentLife: number; 
  opponentCurrentLife: number;
  turn: "user" | "opponent";
  winner?: string;
  isCatched?: boolean;
  canCatch?: boolean;
  hasSwitch?: boolean;
  catchAttempts?: number;
};