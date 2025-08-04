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
    { label: "Name (A-Z)", value: "name.english-asc" },
    { label: "Name (Z-A)", value: "name.english-desc" },
    { label: "Power (High-Low)", value: "base.Attack-desc" },
    { label: "Power (Low-High)", value: "base.Attack-asc" },
    { label: "HP (High-Low)", value: "base.HP-desc" },
    { label: "HP (Low-High)", value: "base.HP-asc" },
  ];

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <FilterBar
        title={title}
        searchValue={searchQuery}
        onSearchChange={(value) => setSearchQuery(value)}
        filterOptions={filterOptions}
        filterValue={filterValue}
        filterLabel="ID"
        onFilterChange={(value) => setFilterValue(value)}
      />
      <PokemonTable
        isMyPokemons={isMyPokemons}
        searchQuery={searchQuery}
        sortOption={filterValue || undefined} 
      />
    </div>
  );
}