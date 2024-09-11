import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  const server = new Server({ port: 3000 });
  await server.start();
}
