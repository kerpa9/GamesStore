import { Response, Request } from "express";

export class VideogamesController {
  constructor() {}

  createVideogames = (req: Request, res: Response) => {
    const { name, price, description } = req.body;

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
