import { useState } from "react";
import { FilterBar } from "../components/FilterBar/FilterBar";
import PokemonTable from "../components/Table/PokemonTable";

export default function AllPokemonsPage() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filterValue, setFilterValue] = useState<string | null>(null); // State for filter selection

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <FilterBar
        title="All Pokémons"
        searchValue={searchQuery}
        onSearchChange={(value) => setSearchQuery(value)} // Update search query
        filterOptions={[
          { label: "Name", value: "name" },
          { label: "HP ", value: "hp" },
          { label: "Attack", value: "attack" },
        ]}
        filterValue={filterValue}
        filterLabel="ID"
        onFilterChange={(value) => setFilterValue(value)} // Update filter value
      />
      <PokemonTable
        isMyPokemons={false}
        searchQuery={searchQuery} 
        sortOption={filterValue ?? undefined} 
      />
    </div>
  );
}