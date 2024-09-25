import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes/indexRoute";
import { Server } from "./presentation/server";
// import "reflect-metadata";

(async () => {
  main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  await server.start();
}
