import type { Pokemon } from "@/typs/Pokemon";

export function normalizePokemon(pokemon: any): Pokemon {
  return {
    id: pokemon.id || 0,
    name: {
      english: pokemon.name?.english || "Unknown",
      japanese: pokemon.name?.japanese || "不明",
      chinese: pokemon.name?.chinese || "未知",
      french: pokemon.name?.french || "Inconnu",
      ...pokemon.name,
    },
    type: pokemon.type || [],
    base: {
      HP: pokemon.base?.HP || 0,
      Attack: pokemon.base?.Attack || 0,
      Defense: pokemon.base?.Defense || 0,
      "Sp. Attack": pokemon.base?.["Sp. Attack"] || 0,
      "Sp. Defense": pokemon.base?.["Sp. Defense"] || 0,
      Speed: pokemon.base?.Speed || 0,
    },
    species: pokemon.species || "Unknown",
    description: pokemon.description || "No description available.",
    evolution: pokemon.evolution || { next: [], prev: [] },
    profile: {
      height: pokemon.profile?.height || "Unknown",
      weight: pokemon.profile?.weight || "Unknown",
      gender: pokemon.profile?.gender || "Unknown",
      ability: pokemon.profile?.ability || [],
      egg: pokemon.profile?.egg || [],
    },
    image: {
      sprite: pokemon.image?.sprite || "",
      thumbnail: pokemon.image?.thumbnail || "",
      hires: pokemon.image?.hires || "",
    },
    isMyPokemon: false, 
  };
}