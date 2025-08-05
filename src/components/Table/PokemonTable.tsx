import { useState, useEffect } from "react";
import { useMyPokemons } from "../../hooks/useMyPokemons";
import { DataTable } from "./DataTable";
import { PokemonTableRow } from "./PokemonTableRow";
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

  useEffect(() => {
    setPagination({ page: 1, pageSize: pagination.pageSize });
  }, [searchQuery]);

  const { pokemons, isLoading, error, total } = useMyPokemons({
    page: pagination.page,
    rowsPerPage: pagination.pageSize,
    sortOption,
    searchQuery,
    isMyPokemons,
  });

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination({ page: 1, pageSize: newPageSize });
  };

  const columns = [
    {
      header: "Pokemon Name",
      accessor: (pokemon: Pokemon) => pokemon.name.english,
      width: "200px", 
    },
    {
      header: "ID",
      accessor: (pokemon: Pokemon) => pokemon.id,
      width: "100px", 
    },
    {
      header: "Description",
      accessor: (pokemon: Pokemon) => pokemon.description,
      width: "300px", 
    },
    {
      header: "Power Level",
      accessor: (pokemon: Pokemon) => pokemon.base.Attack,
      width: "150px", 
    },
    {
      header: "HP",
      accessor: (pokemon: Pokemon) => pokemon.base.HP,
      width: "150px", 
    },
  ];

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DataTable
      data={pokemons}
      columns={columns}
      isLoading={isLoading}
      page={pagination.page}
      pageSize={pagination.pageSize}
      total={total}
      rowRenderer={(pokemon) => <PokemonTableRow key={pokemon.id} pokemon={pokemon} />}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      rowsPerPageOptions={[5, 10, 20]}
    />
  );
};

export default PokemonTable;