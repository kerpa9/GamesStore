import { Router } from "express";
import { VideogamesController } from "../controllers/videogames.controller";

export class VideogamesRoutes {
  static get routesGames(): Router {
    const videogamesController = new VideogamesController();
    const routerGames = Router();

    routerGames.post("/", videogamesController.createVideogames);
    routerGames.get("/", videogamesController.getVideogames);
    routerGames.get("/:id", videogamesController.getVideogamesById);
    routerGames.patch("/:id", videogamesController.patchVideogame);
    routerGames.delete("/:id", videogamesController.deleteVideogame);

    return routerGames;
  }
}
