import http from "node:http";
import { URL } from "node:url";
import { getPokemonData } from "./service/pokemon_service.js";
import dotenv from "dotenv";

dotenv.config();

const requestListener = async function (req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pokemonName = parsedUrl.pathname.substring(1); //

  // Adicionar cabeçalhos CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const data = await getPokemonData(pokemonName);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `Server is running on http://${process.env.HOST}:${process.env.PORT}`
  );
});
