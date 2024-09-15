import { Response, Request } from "express";
import { VideoGamesServices } from "../services/videoGames.Services";
import { CatchError } from "../../domain";

export class VideogamesController {
  constructor(public readonly videogameService: VideoGamesServices) {}

  createVideogames = (req: Request, res: Response) => {
    const { name, price, description } = req.body;

    this.videogameService
      .createVideoGame({ name, price, description })
      .then((videogame) => {
        return res.status(201).json(videogame);
      })
      .catch((err: any) => {
        console.log(err);
        if (err instanceof CatchError) {
          return res.status(err.statusCode).json({ messsage: err.message });
        }
        return res.status(500).json({ message: " something went very wrong" });
      });
  };

  getVideogames = (req: Request, res: Response) => {
    this.videogameService
      .findAllVideogames()
      .then((videogames) => {
        return res.status(200).json(videogames);
      })
      .catch((err: any) => {
        console.log(err);
        if (err instanceof CatchError) {
          return res.status(err.statusCode).json({ messsage: err.message });
        }
        return res.status(500).json({ message: " something went very wrong" });
      });
  };

  getVideogamesById = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser numero" });
    }
    this.videogameService
      .findOneVideogamesById(+id)
      .then((videogame) => {
        return res.status(200).json(videogame);
      })
      .catch((err: any) => {
        console.log(err);
        if (err instanceof CatchError) {
          return res.status(err.statusCode).json({ messsage: err.message });
        }
        return res.status(500).json({ message: " something went very wrong" });
      });
  };

  patchVideogame = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if (isNaN(+id)) {
      return res.status(400).json({ message: "El id debe ser numero" });
    }
    this.videogameService
      .updateVideogamesById({ name, price, description }, +id)
      .then((videogame) => {
        return res.status(200).json(videogame);
      })
      .catch((err: any) => {
        console.log(err);
        if (err instanceof CatchError) {
          return res.status(err.statusCode).json({ messsage: err.message });
        }
        return res.status(500).json({ message: " something went very wrong" });
      });
  };

  deleteVideogame = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(400).json({ message: `El ${id}, debe ser un numero` });
    }

    this.videogameService
      .deleteVideogames(+id)
      .then(() => {
        return res.status(204).json();
      })
      .catch((err: any) => {
        if (err instanceof CatchError) {
          return res.status(err.statusCode).json({ messsage: err.message });
        }
        return res.status(500).json({ message: " something went very wrong" });
      });
  };
}
