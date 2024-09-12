import { Router } from "express";
import { VideogamesController } from "./controler";

export class VideogamesRoutes {
  static get routesGames(): Router {
    const videogamesController = new VideogamesController();
    const routerGames = Router();

    routerGames.post("/", videogamesController.createVideogames);
    routerGames.get("/", videogamesController.getVideogames);

    return routerGames;
  }
}
