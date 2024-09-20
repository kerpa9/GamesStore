export class CreatePurchasesDTO {
  private constructor(
    private readonly userId: number,
    private readonly videogameId: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreatePurchasesDTO?] {
    const { userId, videogameId } = object;

    if (!userId) return ["Missing userId"];
    if (typeof +userId !== "number") return ["userId must be a number"];
    if (!videogameId) return ["Missing videogameId"];
    if (typeof +videogameId !== "number")
      return ["videogameId must be a number"];

    return [undefined, new CreatePurchasesDTO(userId, videogameId)];
  }
}
