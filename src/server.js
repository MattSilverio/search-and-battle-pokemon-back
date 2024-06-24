import http from "node:http";
import { URL } from "node:url";
import { getPokemonData } from "./service/pokemon_service.js";

const host = "localhost";
const port = 8000;

const requestListener = async function (req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pokemonName = parsedUrl.pathname.substring(1); //

  try {
    const data = await getPokemonData(pokemonName);

    res.end(JSON.stringify(data));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
