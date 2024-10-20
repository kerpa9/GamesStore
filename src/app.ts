// import { envs } from "./config/envs";
// import { PostgresDatabase } from "./data";
// import { AppRoutes } from "./presentation/routes/indexRoute";
// import { Server } from "./presentation/server";
// // import "reflect-metadata";

// (async () => {
//   main();
// })();

// async function main() {
//   const postgres = new PostgresDatabase({
//     host: envs.DATABASE_HOST,
//     port: envs.DATABASE_PORT,
//     username: envs.DATABASE_USERNAME,
//     password: envs.DATABASE_PASSWORD,
//     database: envs.DATABASE_DATABASE,
//   });

//   await postgres.connect();

//   const server = new Server({
//     port: envs.PORT,
//     routes: AppRoutes.routes,
//   });
//   await server.start();
// }

export function sum(a: number, b: number) {
  return a + b;
}

export function isEven(n: number) {
  return n % 2 === 0;
}

export function divide(a: number, b: number) {
  if (b === 0) throw new Error("Cannot divide by zero");

  return a / b;
}

export function multiple(a: number, b: number) {
  return a * b;
}
