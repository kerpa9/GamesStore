import { Response, Request } from "express";
import { VideoGamesServices } from "../services/videoGames.Services";

export class VideogamesController {
  constructor(public readonly videogameService: VideoGamesServices) {}

  createVideogames = (req: Request, res: Response) => {
    const { name, price, description } = req.body;

    this.videogameService.createVideoGame("Ho");

    return res.status(201).json({ name, price, description });
  };

  getVideogames = (req: Request, res: Response) => {
    return res.status(200).json({
      message: "videogames",
    });
  };

  getVideogamesById = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(200).json({
      message: "videogames",
      id,
    });
  };

  patchVideogame = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(200).json({
      message: "videogames actualizado",
      id,
    });
  };

  deleteVideogame = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(204).json({
      message: "videogames eliminado",
      id,
    });
  };
}
