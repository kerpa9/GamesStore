import { Request, Response } from "express";
import { CatchError } from "../../domain";

export class PurchasesController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CatchError)
      return res.status(error.statusCode).json({ message: error.message });

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong" });
  };

  static getPurchases = (req: Request, res: Response) => {
    return res.status(200).json({ message: "Ejecución get " });
  };
}
