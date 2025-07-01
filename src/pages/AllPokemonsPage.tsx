import { useState } from "react"
import FilterBar from "@/components/FilterBar/FilterBar"
import AllPokemonTable from "@/components/PokemonTable/AllPokemonTable"
import type { Pokemon } from "@/typs/Pokemon"

type Props = {
  pokemons: Pokemon[]
}

export default function AllPokemonsPage({ pokemons }: Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<string | undefined>(undefined)

  // Compute filtered and sorted Pokémon list
  const filteredPokemons = (() => {
    let result = pokemons

    // Apply search
    if (searchQuery) {
      result = result.filter((pokemon) =>
        pokemon.name.english.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sorting
    if (sortOption) {
      result = [...result].sort((a, b) => {
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

    return result
  })()

  return (
    <div className="min-h-screen flex flex-col items-center  px-[32px]">
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      <div
        className="w-full max-w-[1376px] mt-6 border "
      >
        <AllPokemonTable pokemons={filteredPokemons} />
      </div>
    </div>
  )
}