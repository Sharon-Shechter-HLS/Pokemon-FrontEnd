export type BattleData = {
  _id: string;
  user: {
    _id: string;
    name: {
      english: string;
    };
    image?: {
      hires?: string;
    };
    base: {
      Speed: number;
    };
    species?: string;
    profile?: {
      ability?: string[][];
    };
    userCurrentLife: number;
  };
  opponent: {
    _id: string;
    name: {
      english: string;
    };
    image?: {
      hires?: string;
    };
    base: {
      Speed: number;
    };
    species?: string;
    profile?: {
      ability?: string[][];
    };
    opponentCurrentLife: number;
  };
  turn: "user" | "opponent";
  winner?: string;
  isCatched?: boolean;
  canCatch?: boolean;
  hasSwitch?: boolean; 
  catchAttempts?: number; 
};