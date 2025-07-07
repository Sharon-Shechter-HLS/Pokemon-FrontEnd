import { useState } from "react";
import { FilterBar } from "../components/FilterBar/FilterBar";
import PokemonTable from "../components/Table/PokemonTable";

type PokemonPageProps = {
  isMyPokemons?: boolean; // Determines whether to show "My Pokémons" or "All Pokémons"
};

export default function PokemonPage({ isMyPokemons = false }: PokemonPageProps) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filterValue, setFilterValue] = useState<string | null>(null); // State for filter selection

  const title = isMyPokemons ? "My Pokémons" : "All Pokémons"; // Dynamic title
  const filterOptions = [
    { label: "Name", value: "name" },
    { label: "HP", value: "hp" },
    { label: "Attack", value: "attack" },
  ]; 

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <FilterBar
        title={title}
        searchValue={searchQuery}
        onSearchChange={(value) => setSearchQuery(value)} // Update search query
        filterOptions={filterOptions}
        filterValue={filterValue}
        filterLabel="Id"
        onFilterChange={(value) => setFilterValue(value)} // Update filter value
      />
      <PokemonTable
        isMyPokemons={isMyPokemons} // Pass the prop to determine data source
        searchQuery={searchQuery} // Pass search query to the table
        sortOption={filterValue ?? undefined} // Pass filter value to the table
      />
    </div>
  );
}