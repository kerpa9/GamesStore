export class CreateVideogameDto {
  private constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly description: string
  ) {}

  /**
   * @description este método valuda los datos para crear un videojuego
   * @param object este objeto es el que recibimos de el cliente
   * @returns un arreglo con el mensaje de error y el objeto de tipo CreateVideogameDto
   */
  static create(object: {
    [key: string]: any;
  }): [string?, CreateVideogameDto?] {
    const { name, price, description } = object;

    if (!name) return ["Missing name"];
    if (!price || price < 0) return ["Missing price"];
    if (!description || description.length < 10)
      return [
        "Description is missing or not accepted if its length is less than ten characters.",
      ];

    return [undefined, new CreateVideogameDto(name, price, description)];
  }
}
