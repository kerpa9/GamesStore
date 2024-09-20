import { Router } from "express";
import { VideogamesRoutes } from "./routeVideogames";
import { AuthRoutes } from "./routeAuth";
import { PurchasesRoute } from "./routePurchases";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Rutas para videogames
    router.use("/videogames", VideogamesRoutes.routesGames);
    router.use("/auth", AuthRoutes.routesAuth);
    router.use("/purchases", PurchasesRoute.routePurchase);

    //Rutas para users
    // router.use();

    //Rutas para purchases
    // router.use();

    return router;
  }
}
