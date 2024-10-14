import { Router } from "express";
import { VideogamesController } from "../controllers/videogames.controller";
import { VideoGamesServices } from "../services/videoGames.Services";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { uploadArray } from "../../config/uploadFilesAdapter";

export class VideogamesRoutes {
  static get routesGames(): Router {
    const videogamesServices = new VideoGamesServices();
    const videogamesController = new VideogamesController(videogamesServices);
    const routerGames = Router();

    routerGames.use(AuthMiddleware.protect);

    routerGames.post(
      "/",
      uploadArray("imgs", 5),
      videogamesController.createVideogames
    );
    routerGames.get("/", videogamesController.getVideogames);
    routerGames.get("/:id", videogamesController.getVideogamesById);
    routerGames.patch("/:id", videogamesController.patchVideogame);
    routerGames.delete("/:id", videogamesController.deleteVideogame);

    return routerGames;
  }
}
