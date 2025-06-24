// src/components/Pokemon/pokemonType.ts
export type Pokemon = {
  id: number
  name: {
    english: string
    japanese: string
    chinese: string
    french: string
  }
  type: string[]
  base: {
    HP: number
    Attack: number
    Defense: number
    "Sp. Attack": number
    "Sp. Defense": number
    Speed: number
  }
  species: string
  description: string
  image: {
    sprite: string
    thumbnail: string
    hires: string
  }
  owned?: boolean
}
