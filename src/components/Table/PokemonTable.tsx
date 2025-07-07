import { useMyPokemons } from "../../hooks/useMyPokemons";
import { DataTable } from "./DataTable";
import { PokemonTableRow } from "./PokemonTableRow";
import type { Pokemon } from "../../typs/Pokemon";

type PokemonTableProps = {
  isMyPokemons?: boolean;
  searchQuery?: string;
  sortOption?: string;
};

export const PokemonTable = ({
  isMyPokemons = false,
  searchQuery = "",
  sortOption,
}: PokemonTableProps) => {
  const { pokemons, isLoading } = useMyPokemons(searchQuery, sortOption, isMyPokemons);

  const page = 1; 
  const pageSize = 10;
  const total = pokemons.length; 

  const columns = [
    {
      header: "Pokemon Name",
      accessor: (pokemon: Pokemon) => pokemon.name.english,
    },
    {
      header: "ID",
      accessor: (pokemon: Pokemon) => pokemon.id,
    },
    {
      header: "Description",
      accessor: (pokemon: Pokemon) => pokemon.description,
    },
    {
      header: "HP Level",
      accessor: (pokemon: Pokemon) => pokemon.base.HP,
    },
  ];

  return (
    <DataTable
      data={pokemons}
      columns={columns}
      isLoading={isLoading}
      page={page}
      pageSize={pageSize}
      total={total}
      rowRenderer={(pokemon) => <PokemonTableRow key={pokemon.id} pokemon={pokemon} />}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
      rowsPerPageOptions={[5, 10, 20]}
    />
  );
};

export default PokemonTable;