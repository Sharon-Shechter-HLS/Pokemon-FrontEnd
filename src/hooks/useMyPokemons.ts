import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Pokemon } from "@/typs/Pokemon";

type FetchPokemonsParams = {
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  search?: string;
  fromMy?: boolean;
  userId?: string;
};

type FetchPokemonsResponse = {
  data: Pokemon[];
  meta: {
    start: number;
    end: number;
    total: { total: number }[]; 
  };
};

async function fetchPokemons({
  page,
  rowsPerPage,
  sortBy,
  search,
  fromMy,
}: FetchPokemonsParams): Promise<FetchPokemonsResponse> {
  const response = await axios.get("http://localhost:3000/pokemons", {
    params: {
      page,
      rowsPerPage,
      sortBy,
      search,
      fromMy,
      userId: USER_ID, // Always include userId in the request
    },
  });
  return response.data;
}

const SORT_BY_OPTIONS = [
  "name.english-asc",
  "name.english-desc",
  "base.Attack-asc",
  "base.Attack-desc",
  "base.HP-asc",
  "base.HP-desc",
] as const;

const USER_ID = "687e5c1b22589cce30fa9765"; 

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
        sortBy: validatedSortOption,
        search: searchQuery,
        fromMy: isMyPokemons,
        userId: USER_ID,
      }),
  });

  const pokemons = data?.data || [];
  const meta = {
    start: data?.meta?.start || 0,
    end: data?.meta?.end || 0,
    total: Array.isArray(data?.meta?.total) ? data?.meta?.total[0]?.total || 0 : data?.meta?.total || 0, 
  };

  return {
    pokemons,
    isLoading,
    meta,
    error,
  };
}