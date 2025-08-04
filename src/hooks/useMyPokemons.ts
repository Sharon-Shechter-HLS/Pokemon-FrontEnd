import { useQuery } from "@tanstack/react-query";
import { fetchPokemons } from "@/api/pokemonsAPI";
import {UserId} from '../consts'

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
  const validatedSortOption = SORT_BY_OPTIONS.includes(sortOption as typeof SORT_BY_OPTIONS[number])
    ? sortOption
    : undefined;

  const { data, isLoading, error } = useQuery({
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

  const pokemons = data?.pokemons || [];
  const meta = {
    total: data?.total || 0,
  };

  return {
    pokemons,
    isLoading,
    meta,
    error,
  };
}