import { UserId } from "../consts";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const attack = async (gameId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/arena/attack`, { gameId });
    return response.data;
  } catch (error) {
    console.error("Failed to perform attack:", error);
    throw error;
  }
};

export const catchOpponent = async (gameId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/arena/catch`, { gameId });
    return response.data;
  } catch (error) {
    console.error("Failed to catch opponent:", error);
    throw error;
  }
};

export const startNewBattle = async (pokemonId: string) => {
  try {
    const payload = {
      userId: String(UserId),
      pokemonId: String(pokemonId),
    };

    const response = await axios.post(`${BASE_URL}/arena/startGame`, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to start a new battle:", error);
    throw error;
  }
};

// Add the switchPokemon method
export const switchPokemon = async (gameId: string, newPokemonId: string) => {
  try {
    const payload = {
      gameId,
      newPokemonId,
    };

    const response = await axios.post(`${BASE_URL}/arena/switchPokemon`, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to switch Pokémon:", error);
    throw error;
  }
};

export const addPokemon = async (userId: string, pokemonId: string) => {
  console.log("add pokemon called with userId:", userId, "and pokemonId:", pokemonId);
  try {
    const payload = {
      userId,
      pokemonId,
    };

    const response = await axios.post(`${BASE_URL}/users/addPokemon`, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to add Pokémon:", error);
    throw error;
  }
};

export const removePokemon = async (userId: string, pokemonId: string) => {
  try {
    const payload = {
      userId,
      pokemonId,
    };

    const response = await axios.delete(`${BASE_URL}/users/removePokemon`, { data: payload });
    return response.data;
  } catch (error) {
    console.error("Failed to remove Pokémon:", error);
    throw error;
  }
};