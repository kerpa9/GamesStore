export class UpdateVideoGameDTO {
  constructor(public readonly name: string, public readonly price: number) {}

  static update(object: {
    [key: string]: any;
  }): [string?, UpdateVideoGameDTO?] {
    const { name, price } = object;
    if (!name) return ["Missing name"];
    if (!price || price < 0) return ["Missing price"];

    return [undefined, new UpdateVideoGameDTO(name, price)];
  }
}
