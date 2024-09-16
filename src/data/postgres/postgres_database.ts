import { DataSource } from "typeorm";
import { VideoGameModel } from "./models/Videogame.model";
import { AuthModel } from "./models/Auth.model";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  private datasource: DataSource;

  constructor(options: Options) {
    this.datasource = new DataSource({
      type: "postgres",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      //Entidades
      entities: [VideoGameModel, AuthModel],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async connect() {
    try {
      await this.datasource.initialize();
      console.log("Connected to database 😊😁");
    } catch (err) {
      console.log(err);
    }
  }
}
