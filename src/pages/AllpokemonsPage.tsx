import { useState } from "react";
import { FilterBar } from "../components/FilterBar/FilterBar";
import PokemonTable from "../components/Table/PokemonTable";

export default function AllPokemonsPage() {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filterValue, setFilterValue] = useState<string | null>(null); 

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <FilterBar
        title="All Pokémons"
        searchValue={searchQuery}
        onSearchChange={(value) => setSearchQuery(value)} 
        filterOptions={[
          { label: "Name", value: "name" },
          { label: "HP ", value: "hp" },
          { label: "Attack", value: "attack" },
        ]}
        filterValue={filterValue}
        filterLabel="ID"
        onFilterChange={(value) => setFilterValue(value)} 
      />
      <PokemonTable
        isMyPokemons={false}
        searchQuery={searchQuery} 
        sortOption={filterValue ?? undefined} 
      />
    </div>
  );
}