import { Router } from "express";
import { VideogamesRoutes } from "./routeVideogames";
import { AuthRoutes } from "./routeAuth";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Rutas para videogames
    router.use("/videogames", VideogamesRoutes.routesGames);
    router.use("/auth", AuthRoutes.routesAuth);

    //Rutas para users
    // router.use();

    //Rutas para purchases
    // router.use();

    return router;
  }
}
