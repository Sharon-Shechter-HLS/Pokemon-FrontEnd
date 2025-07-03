import { useState } from "react";
import FilterBar from "@/pages/AllPokemonsPage/FilterBar";
import PokemonTable from "@/components/PokemonTable/PokemonTable";
import { useMyPokemons } from "@/hooks/useMyPokemons";
import PokemonInfoModal from "@/components/Modals/InfoModal"; 

type PokemonPageProps = {
  isMyPokemons?: boolean;
};

export default function PokemonPage({ isMyPokemons = false }: PokemonPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string | undefined>(undefined);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State for selected Pokémon
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const { pokemons, isLoading } = useMyPokemons(searchQuery, sortOption, isMyPokemons);

  const handleRowClick = (pokemon: any) => {
    setSelectedPokemon(pokemon); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedPokemon(null);
  };

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
          <PokemonTable pokemons={pokemons} onRowClick={handleRowClick} />
        )}
      </div>

      {/* Info Modal */}
      {selectedPokemon && (
        <PokemonInfoModal
          open={isModalOpen}
          onClose={closeModal}
          pokemon={selectedPokemon}
        />
      )}
    </div>
  );
}