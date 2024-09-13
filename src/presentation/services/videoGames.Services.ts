import { VideoGameModel } from "../../data";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class VideoGamesServices {
  constructor() {}

  async createVideoGame(videogameData: any) {
    // Services
    // 1. Obtener los datos desde el body
    // 2. Crear el videojuego
    try {
      const videogame = new VideoGameModel();
      videogame.title = videogameData.name.toLowerCase().trim();
      videogame.description = videogameData.description.toLowerCase().trim();
      videogame.price = videogameData.price;

      await videogame.save();

      return videogame;
    } catch (err: any) {
      console.log(err);
    }
    // 3. retornar el video juego
  }

  async findAllVideogames() {
    try {
      return await VideoGameModel.find({ where: { status: Status.ACTIVE } });
    } catch (err: any) {
      console.log(err);
    }
  }

  async findOneVideogamesById(id: number) {
    try {
      const videogame = await VideoGameModel.findOne({
        // return await VideoGameModel.findOne({
        where: { id, status: Status.ACTIVE },
      });
      if (!videogame) {
        throw new Error("El video juego no existe");
      }
      return videogame;
    } catch (err: any) {
      throw new Error("Internal server Error");
    }
  }
  async updateVideogamesById(videogameData: any, id: number) {
    const videogame = await this.findOneVideogamesById(id);
    videogame.title = videogameData.name.toLowerCase().trim();
    videogame.description = videogameData.description.toLowerCase().trim();
    videogame.price = videogameData.price;

    try {
      await videogame.save();
      return videogame;
    } catch (err: any) {
      throw new Error("Internal server Error");
    }
  }
}
