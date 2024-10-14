import { UploadFile } from "../../config/uploadFilesCloudAdapter";
import { VideoGameModel } from "../../data";
import { CreateVideogameDto, UpdateVideoGameDTO } from "../../domain";
import { CatchError } from "../../domain/errors/custom.erros";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class VideoGamesServices {
  constructor() {}

  /**
   *@Descripción del metodo create para un videojuego
   *@title: title desde el req.body
   *@description: description desde el req.body
   *@price: price desde el req.bosy
   *@returns: Retorna el guardado de la información
   */

  async createVideoGame(
    videogameData: CreateVideogameDto,
    files: Express.Multer.File[] | undefined
  ) {
    // Services
    // 1. Obtener los datos desde el body
    // 2. Crear el videojuego
    const videogame = new VideoGameModel();

    // console.log(imgs);
    videogame.title = videogameData.name.toLowerCase().trim();
    videogame.description = videogameData.description.toLowerCase().trim();
    videogame.price = videogameData.price;

    if (files && files.length > 0) {
      const imgs = await UploadFile.uploadMultipleFiles("videogames", files);
      videogame.imgs = imgs;
    }

    try {
      return await videogame.save();
    } catch (err: any) {
      throw CatchError.internalServer("Something went very wrong!  🧨🧨");
    }
    // 3. retornar el video juego
  }

  /**
   *Descripción del metodo find all para videojuegos
   *@returns: Retorna toda la inforamción guardada en la ruta
   */

  async findAllVideogames() {
    try {
      return await VideoGameModel.find({ where: { status: Status.ACTIVE } });
    } catch (err: any) {
      throw CatchError.internalServer("Something went very wrong!  🧨🧨");
    }
  }

  /**
   *@Descripción del metodo find one para un videojuego
   *@param id: id del videojuego que se quiere buscar
   *@returns: Retorna el videojuego con el id indicado
   */

  async findOneVideogamesById(id: number) {
    const videogame = await VideoGameModel.findOne({
      where: { id, status: Status.ACTIVE },
    });
    if (!videogame) {
      throw CatchError.notFound(`This ${id} not found`);
    }
    return videogame;
  }

  /**
   *@Descripción del metodo find one para un videojuego
   *@param id: id del videojuego que se quiere buscar
   *@returns: Retorna el videojuego con el id indicado
   */

  async updateVideogamesById(videogameData: UpdateVideoGameDTO, id: number) {
    const videogame = await this.findOneVideogamesById(id);
    videogame.title = videogameData.name.toLowerCase().trim();
    videogame.price = videogameData.price;

    try {
      await videogame.save();
      return videogame;
    } catch (err: any) {
      throw CatchError.internalServer("Something went very wrong!  🧨🧨");
    }
  }

  /**
   *@Descripción del metodo delete para un videojuego
   *@param id: id del videojuego que se quiere eliminar
   *@returns: Retorna un promesa vacía
   */

  async deleteVideogames(id: number) {
    const videogame = await this.findOneVideogamesById(id);
    videogame.status = Status.INACTIVE;
    try {
      await videogame.save();
      return;
    } catch (err) {
      throw CatchError.internalServer("Something went very wrong!  🧨🧨");
    }
  }
}
