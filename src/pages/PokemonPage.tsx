import { useState } from "react";
import { FilterBar } from "../components/FilterBar/FilterBar";
import PokemonTable from "../components/Table/PokemonTable";

type PokemonPageProps = {
  isMyPokemons?: boolean;
};

export default function PokemonPage({ isMyPokemons = false }: PokemonPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState<string | null>(null);

  const title = isMyPokemons ? "My Pokémons" : "All Pokémons";
  const filterOptions = [
    { label: "Name (A-Z)", value: "name-asc" },
          { label: "Name (Z-A)", value: "name-desc" },
          { label: "Power (High-Low)", value: "power-desc" },
          { label: "Power (Low-High)", value: "power-asc" },
          { label: "HP (High-Low)", value: "hp-desc" },
          { label: "HP (Low-High)", value: "hp-asc" },
  ];

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <FilterBar
        title={title}
        searchValue={searchQuery}
        onSearchChange={(value) => setSearchQuery(value)}
        filterOptions={filterOptions}
        filterValue={filterValue}
        filterLabel="Sort By"
        onFilterChange={(value) => setFilterValue(value)}
      />
      <PokemonTable
        isMyPokemons={isMyPokemons}
        searchQuery={searchQuery}
        sortOption={filterValue ?? undefined}
      />
    </div>
  );
}