import { Request, Response } from "express";
import { CatchError } from "../../domain";
import { CreatePurchasesDTO } from "../../domain/dtos/purchases/create.Purchases";

export class PurchasesController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CatchError)
      return res.status(error.statusCode).json({ message: error.message });

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong" });
  };

  createPurchases = (req: Request, res: Response) => {
    const [error, createPurchases] = CreatePurchasesDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });
  };

  getPurchasesById = (req: Request, res: Response) => {};
  updatePurchases = (req: Request, res: Response) => {};
  deletePurchases = (req: Request, res: Response) => {};

  getPurchases = (req: Request, res: Response) => {
    return res.status(200).json({ message: "Ejecución get " });
  };
}
