import { PostgresDatabase } from "./data";
import { AppRoutes } from "./presentation/routes/indexRoute";
import { Server } from "./presentation/server";
// import "reflect-metadata";

(async () => {
  main();
})();

async function main() {
  //Connection or Database
  // postgresql: //videogamedb_owner:erDQlxM4fLc3@ep-tight-resonance-a5lg2m37.us-east-2.aws.neon.tech/videogamedb?sslmode=require

  const postgres = new PostgresDatabase({
    host: "ep-tight-resonance-a5lg2m37.us-east-2.aws.neon.tech",
    port: 5432,
    username: "videogamedb_owner",
    password: "erDQlxM4fLc3",
    database: "videogamedb",
  });

  await postgres.connect();
  const server = new Server({
    port: 3000,
    routes: AppRoutes.routes,
  });
  await server.start();
}
