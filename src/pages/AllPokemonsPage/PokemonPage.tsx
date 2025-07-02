import { useState } from "react"
import FilterBar from "@/pages/AllPokemonsPage/FilterBar"
import PokemonTable from "@/components/PokemonTable/PokemonTable"
import { useMyPokemons } from "@/hooks/useMyPokemons"

type PokemonPageProps = {
  isMyPokemons?: boolean 
}

export default function PokemonPage({ isMyPokemons = false }: PokemonPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<string | undefined>(undefined)

  const { pokemons, isLoading } = useMyPokemons(searchQuery, sortOption, isMyPokemons)

  return (
    <div className="min-h-screen flex flex-col items-center px-[32px]">
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      <div className="w-full max-w-[1376px] mt-6 border">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <PokemonTable pokemons={pokemons} />
        )}
      </div>
    </div>
  )
}