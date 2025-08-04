import axios from "axios";
import type { Pokemon } from "../typs/Pokemon";

const BASE_URL = "http://localhost:3000/pokemons";

export type FetchPokemonsParams = {
  page: number;
  rowsPerPage: number;
  sortBy: string;
  search?: string;
  fromMy?: boolean;
  userId: string;
};

export type FetchPokemonsResponse = {
  pokemons: Pokemon[];
  total: number;
}

export async function fetchPokemons({
  page,
  rowsPerPage,
  sortBy,
  search = "",
  fromMy = false,
  userId,
}: FetchPokemonsParams): Promise<FetchPokemonsResponse> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        page,
        rowsPerPage,
        sortBy,
        search,
        fromMy,
        userId,
      },
    });

    const { data, meta } = response.data; 
    return {
      pokemons: data,
      total: meta?.total?.[0]?.total 
    };
  } catch (error) {
    console.error("Failed to fetch pokemons:", error);
    throw error;
  }
}