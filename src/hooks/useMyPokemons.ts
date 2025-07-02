import { useQuery } from "@tanstack/react-query"
import pokemonsData from "@/data/pokemonsData.json"
import type { Pokemon } from "@/typs/Pokemon"

const DEFAULT_POKEMON_IDS = [1, 5, 7,8]

// Mock backend functions
async function fetchAllPokemons(): Promise<Pokemon[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const enrichedData = pokemonsData.map((pokemon: Pokemon) => ({
        ...pokemon,
        isMyPokemon: DEFAULT_POKEMON_IDS.includes(pokemon.id),
      }))
      resolve(enrichedData)
    }, 500) // Simulate backend delay
  })
}

async function fetchMyPokemons(): Promise<Pokemon[]> {
  const allPokemons = await fetchAllPokemons()
  return allPokemons.filter((pokemon) => pokemon.isMyPokemon)
}

async function fetchFilteredPokemons(
  searchQuery: string,
  sortOption?: string,
  isMyPokemons: boolean = false
): Promise<Pokemon[]> {
  const allPokemons = isMyPokemons ? await fetchMyPokemons() : await fetchAllPokemons()

  let filteredPokemons = allPokemons

  // Apply search filtering
  if (searchQuery) {
    filteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon.name.english.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Apply sorting
  if (sortOption) {
    filteredPokemons = [...filteredPokemons].sort((a, b) => {
      if (sortOption === "name") {
        return a.name.english.localeCompare(b.name.english)
      } else if (sortOption === "hp") {
        return b.base.HP - a.base.HP
      } else if (sortOption === "attack") {
        return b.base.Attack - a.base.Attack
      } else if (sortOption === "id") {
        return a.id - b.id
      }
      return 0
    })
  }

  return filteredPokemons
}

export function useMyPokemons(searchQuery: string = "", sortOption?: string, isMyPokemons: boolean = false) {
  const { data: pokemons = [], isLoading } = useQuery<Pokemon[]>({
    queryKey: ["pokemons", searchQuery, sortOption, isMyPokemons], // Include isMyPokemons in query key
    queryFn: () => fetchFilteredPokemons(searchQuery, sortOption, isMyPokemons), // Fetch filtered data
  })

  return {
    pokemons,
    isLoading,
  }
}
