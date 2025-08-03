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