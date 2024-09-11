import express, { NextFunction, Request, Response } from "express";
import { AppRoutes } from "./route";

interface Options {
  port: number;
}

export class Server {
  public readonly app = express();
  private readonly port: number;

  constructor(options: Options) {
    this.port = options.port;
  }

  async start() {
    //Middlewares

    this.app.use(express.json()); //Control of data for response in JSON
    this.app.use(express.urlencoded({ extended: true })); //Control of data for response in urlencoded

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log("object");
      next();
    });

    this.app.use("/api/v1", AppRoutes.routes);

    this.app.listen(this.port, () => {
      console.log(
        `Server is running on port http://localhost:${this.port} 😊😂🌚`
      );
    });
  }
}

// const server = new Server({ port: 3000 });
