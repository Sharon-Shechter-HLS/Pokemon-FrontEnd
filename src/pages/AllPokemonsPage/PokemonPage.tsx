import { useState } from "react";
import FilterBar from "@/pages/AllPokemonsPage/FilterBar";
import PokemonTable from "@/components/Table/PokemonTable";
import { useMyPokemons } from "@/hooks/useMyPokemons";
import PokemonInfoModal from "@/components/Modals/InfoModal";

type PokemonPageProps = {
  isMyPokemons?: boolean;
};

export default function PokemonPage({ isMyPokemons = false }: PokemonPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string | null>(null); // Updated to match new FilterBar props
  const [selectedPokemon, setSelectedPokemon] = useState(null); // State for selected Pokémon
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const { pokemons, isLoading } = useMyPokemons(searchQuery, sortOption || undefined, isMyPokemons);

  const handleRowClick = (pokemon: any) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Updated FilterBar */}
        <FilterBar
          title="Pokémon List" // Added title prop
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption ?? undefined}
          onSortChange={(option) => setSortOption(option ?? null)}
        />

        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <PokemonTable pokemons={pokemons} onRowClick={handleRowClick} />
          )}
        </div>
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