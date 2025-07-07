export type Pokemon = {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
    [key: string]: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
    [key: string]: number;
  };
  species: string;
  description: string;
  evolution: {
    next?: string[][]; 
    [key: string]: any;
  };
  profile: {
    height: string;
    weight: string;
    egg: string[];
    ability: string[][]; 
    gender: string;
    [key: string]: any;
  };
  image: {
    sprite: string;
    thumbnail: string;
    hires: string;
    [key: string]: string;
  };
  isMyPokemon?: boolean;
};