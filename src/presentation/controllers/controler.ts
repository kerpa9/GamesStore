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
}
