import { UserId } from "../consts";
import axios from "axios";

const BASE_URL = "http://localhost:3000/arena";

export const attack = async (gameId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/attack`, { gameId });
    return response.data;
  } catch (error) {
    console.error("Failed to perform attack:", error);
    throw error;
  }
};

export const catchOpponent = async (gameId: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/catch`, { gameId });
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

    const response = await axios.post(`${BASE_URL}/startGame`, payload);
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

    const response = await axios.post(`${BASE_URL}/switchPokemon`, payload);
    return response.data;
  } catch (error) {
    console.error("Failed to switch Pokémon:", error);
    throw error;
  }
};