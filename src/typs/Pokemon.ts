export type Pokemon = {
  id: number
  name: {
    english: string
    french?: string
    japanese?: string
    chinese?: string
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
  evolution?: {
    next?: string[][] // Adjusted to match the JSON structure
  }
  profile?: {
    gender?: string
  }
  image : {
    thumbnail?: string
    hires?: string
  }
  isMyPokemon?: boolean // Added this field
}
