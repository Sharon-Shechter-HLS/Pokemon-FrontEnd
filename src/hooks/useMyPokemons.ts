import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchPokemons } from "@/api/pokemonsAPI";
import type { FetchPokemonsResponse } from "@/api/pokemonsAPI";
import { UserId } from "../consts";

const SORT_BY_OPTIONS = [
  "name.english-asc",
  "name.english-desc",
  "base.Attack-asc",
  "base.Attack-desc",
  "base.HP-asc",
  "base.HP-desc",
] as const;

export function useMyPokemons({
  page = 1,
  rowsPerPage = 10,
  sortOption,
  searchQuery = "",
  isMyPokemons = false,
}: {
  page?: number;
  rowsPerPage?: number;
  sortOption?: string;
  searchQuery?: string;
  isMyPokemons?: boolean;
} = {}) {
  const [total, setTotal] = useState(0);

  const validatedSortOption = SORT_BY_OPTIONS.includes(sortOption as typeof SORT_BY_OPTIONS[number])
    ? sortOption
    : undefined;

  const { data, isLoading, error } = useQuery<FetchPokemonsResponse>({
    queryKey: ["pokemons", { page, rowsPerPage, validatedSortOption, searchQuery, isMyPokemons }],
    queryFn: () =>
      fetchPokemons({
        page,
        rowsPerPage,
        sortBy: validatedSortOption || "id-asc",
        search: searchQuery,
        fromMy: isMyPokemons,
        userId: UserId,
      }),
  });

  const pokemons = data?.data || [];
  const meta = {
    total: data?.meta?.total?.total ,
  };

  // Update total state if the meta total changes
  useEffect(() => {
    console.log("Meta total:", meta.total, "Current total:", total);
    if (Array.isArray(meta.total) && meta.total.length === 0) {
      setTotal(0);
    } else if (meta.total !== undefined && meta.total !== total) {
      setTotal(meta.total);
    }
  }, [meta.total, total]);

  return {
    pokemons,
    isLoading,
    meta,
    error,
    total, // Expose the total state
  };
}