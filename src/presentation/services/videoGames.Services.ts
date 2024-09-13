import { VideoGameModel } from "../../data";

// enum Status {}

export class VideoGamesServices {
  constructor() {}

  async createVideoGame(videogameData: any) {
    // Services
    // 1. Obtener los datos desde el body
    // 2. Crear el videojuego
    const videogame = new VideoGameModel();
    videogame.title = videogameData.name.toLowerCase().trim();
    videogame.description = videogameData.description.toLowerCase().trim();
    videogame.price = videogameData.price.trim();

    await videogame.save();

    return videogame;
    // 3. retornar el video juego
  }
}
