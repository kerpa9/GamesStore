import { Router } from "express";
import { VideogamesRoutes } from "./routeVideogames";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Rutas para videogames
    router.use("/videogames", VideogamesRoutes.routesGames);

    //Rutas para users
    // router.use();

    //Rutas para purchases
    // router.use();

    return router;
  }
}
