import axios from "axios";
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemonData = async (pokemonName) => {
  if (!pokemonName) {
    throw new Error("Pokemon Not Specified");
  }

  try {
    const response = await axios.get(`${BASE_URL}/${pokemonName}`);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
