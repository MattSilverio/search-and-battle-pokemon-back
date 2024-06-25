import axios, { HttpStatusCode } from "axios";

export const getPokemonData = async (pokemonName) => {
  if (!pokemonName) {
    throw new Error("Pokemon Not Specified");
  }

  const pokemonNameToLowerCase = pokemonName.toLowerCase();

  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/${pokemonNameToLowerCase}`
    );

    return response.data;
  } catch (error) {
    if (error.response.status === HttpStatusCode.NotFound) {
      throw new Error("Pokemon Not Found");
    }

    throw new Error(error);
  }
};
