import { NextFunction, Router, Response, Request } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Rutas para videogames
    router.get(
      "/videogames",
      (req: Request, res: Response, next: NextFunction) => {
        res.send("videogames");
      }
    );

    //Rutas para users
    router.get("/users", (req: Request, res: Response, next: NextFunction) => {
      res.send("users");
    });
    router.get("/users");

    //Rutas para purchases
    router.get(
      "/purchases",
      (req: Request, res: Response, next: NextFunction) => {
        res.send("purchases");
      }
    );

    return router;
  }
}
