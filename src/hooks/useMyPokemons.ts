import { useEffect, useState } from "react"

const STORAGE_KEY = "myPokemons"
const DEFAULT_POKEMON_IDS = [1, 5, 7]

export function useMyPokemons() {
  const [myPokemonIds, setMyPokemonIds] = useState<number[]>([])

  // Load from localStorage or use defaults if empty
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    try {
      const parsed = JSON.parse(stored || "")
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMyPokemonIds(parsed)
        return
      }
    } catch (err) {
      console.error("Invalid localStorage value:", err)
    }

    // fallback
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_POKEMON_IDS))
    setMyPokemonIds(DEFAULT_POKEMON_IDS)
  }, [])

  // Log when it actually updates
  useEffect(() => {
    console.log("My Pokémons (updated):", myPokemonIds)
  }, [myPokemonIds])

  // Sync localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(myPokemonIds))
  }, [myPokemonIds])

  const isMyPokemon = (id: number) => myPokemonIds.includes(id)

  const addPokemon = (id: number) => {
    if (!isMyPokemon(id)) {
      setMyPokemonIds((prev) => [...prev, id])
    }
  }

  const removePokemon = (id: number) => {
    setMyPokemonIds((prev) => prev.filter((pid) => pid !== id))
  }

  return {
    myPokemonIds,
    isMyPokemon,
    addPokemon,
    removePokemon,
  }
}
