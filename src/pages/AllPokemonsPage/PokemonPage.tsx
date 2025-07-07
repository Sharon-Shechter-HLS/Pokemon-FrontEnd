import { useState } from "react";
import FilterBar from "@/pages/AllPokemonsPage/FilterBar";
import PokemonTable from "@/components/PokemonTable/PokemonTable";
import PokemonInfoModal from "@/components/Modals/InfoModal";
import { useMyPokemons } from "@/hooks/useMyPokemons";
import { CircularLoader } from "@/components/ui/Loader";

type PokemonPageProps = {
  isMyPokemons?: boolean;
};

export default function PokemonPage({ isMyPokemons = false }: PokemonPageProps) {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { pokemons, isLoading } = useMyPokemons(searchValue, filterValue, isMyPokemons);

  const handleRowClick = (pokemon: any) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <FilterBar
        searchQuery={searchValue}
        onSearchChange={setSearchValue}
        sortOption={filterValue}
        onSortChange={setFilterValue}
      />
      <div className="rounded-md overflow-hidden border border-gray-200">
        {isLoading ? (
          <div className="text-center py-6">
            <CircularLoader size={32} />
          </div>
        ) : pokemons.length === 0 ? (
          <div className="text-center py-6">No Pokémon exist</div>
        ) : (
          <PokemonTable
            pokemons={pokemons}
            page={1} // Static page since pagination isn't handled in the hook
            pageSize={pokemons.length} // Display all Pokémon
            total={pokemons.length}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
            loading={isLoading}
            onRowClick={handleRowClick}
          />
        )}
      </div>
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