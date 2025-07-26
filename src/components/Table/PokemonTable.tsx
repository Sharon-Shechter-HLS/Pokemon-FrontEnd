import { useState } from "react";
import { useMyPokemons } from "../../hooks/useMyPokemons";
import { DataTable } from "./DataTable";
import { PokemonTableRow } from "./PokemonTableRow";
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from "../../constants/pagination";
import type { Pokemon } from "../../typs/Pokemon";

type PokemonTableProps = {
  isMyPokemons?: boolean;
  searchQuery?: string;
  sortOption?: string;
};

type PaginationState = {
  page: number;
  pageSize: number;
};

export const PokemonTable = ({
  isMyPokemons = false,
  searchQuery = "",
  sortOption,
}: PokemonTableProps) => {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
  });

  const { pokemons, isLoading } = useMyPokemons({
    searchQuery,
    sortOption,
    isMyPokemons,
    // TODO: Update useMyPokemons to handle pagination (page and pageSize)
    page: pagination.page,
    pageSize: pagination.pageSize,
  });

  const total = pokemons.length;

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination({ page: 1, pageSize: newPageSize }); // Reset to page 1 when page size changes
  };

  const paginatedPokemons = pokemons.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );

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
      header: "Power Level",
      accessor: (pokemon: Pokemon) => pokemon.base.Attack,
    },
    {
      header: "HP Level",
      accessor: (pokemon: Pokemon) => pokemon.base.HP,
    },
  ];

  return (
    <DataTable
      data={paginatedPokemons}
      columns={columns}
      isLoading={isLoading}
      page={pagination.page}
      pageSize={pagination.pageSize}
      total={total}
      rowRenderer={(pokemon) => <PokemonTableRow key={pokemon.id} pokemon={pokemon} />}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
    />
  );
};

export default PokemonTable;