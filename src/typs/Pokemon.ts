export interface Pokemon {
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
  };
  species?: string;
  description?: string;
  evolution?: {
    next?: string[][];
    prev?: string[][];
  };
  profile?: {
    height?: string;
    weight?: string;
    gender?: string;
    ability?: string[][];
    egg?: string[];
  };
  image: {
    sprite: string;
    thumbnail: string;
    hires: string;
    [key: string]: string;
  };
  isMyPokemon?: boolean;
}