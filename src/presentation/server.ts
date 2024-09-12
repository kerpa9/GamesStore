import express, { Router } from "express";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.routes = options.routes;
  }

  async start() {
    //Middlewares

    this.app.use(express.json()); //Control of data for response in JSON
    this.app.use(express.urlencoded({ extended: true })); //Control of data for response in urlencoded

    this.app.use("/api/v1", this.routes);

    this.app.listen(this.port, () => {
      console.log(
        `Server is running on port http://localhost:${this.port} 😊😂🌚`
      );
    });
  }
}

// const server = new Server({ port: 3000 });
