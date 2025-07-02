export type Pokemon = {
  id: number;
  name: {
    english: string;
    french?: string;
    japanese?: string;
    chinese?: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
  species: string;
  description: string;
  evolution?: {
    next?: string[][];
  };
  profile?: {
    gender?: string;
    height?: string;
    weight?: string;
    ability?: string[][]; 
  };
  image: {
    sprite?: string;
    thumbnail?: string;
    hires?: string;
  };
  isMyPokemon?: boolean;
};
