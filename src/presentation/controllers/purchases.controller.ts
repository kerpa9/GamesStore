import { Request, Response } from "express";
import { CatchError } from "../../domain";
import { CreatePurchasesDTO } from "../../domain/dtos/purchases/create.Purchases";
import { PurchaseServices } from "../services/purchases.services";

export class PurchasesController {
  constructor(private readonly purchasesSevices: PurchaseServices) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CatchError)
      return res.status(error.statusCode).json({ message: error.message });

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong" });
  };

  createPurchases = (req: Request, res: Response) => {
    const [error, createPurchasesDTO] = CreatePurchasesDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.purchasesSevices
      .createPurchases(createPurchasesDTO!)
      .then((purchase) => res.status(201).json(purchase))
      .catch((error) => this.handleError(error, res));
  };

  getPurchases = (req: Request, res: Response) => {
    this.purchasesSevices
      .findAllPurchases()
      .then((purchase) => res.status(200).json(purchase))
      .catch((error) => this.handleError(error, res));
  };

  getPurchasesById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id))
      return res.status(400).json({ message: `This ${id} isn't at number` });
    this.purchasesSevices
      .findOnePurchases(+id)
      .then((purchase) => res.status(200).json(purchase))
      .catch((error) => this.handleError(error, res));
  };

  // updatePurchases = (req: Request, res: Response) => {};
  deletePurchases = (req: Request, res: Response) => {
    const userId = req.body.sesionUser.id;
    const { id } = req.params;
    if (isNaN(+id))
      return res.status(400).json({ message: `This ${id} isn't at number` });
    this.purchasesSevices
      .deletePurchases(+id, userId)
      .then(() => res.status(200).json(null))
      .catch((error) => this.handleError(error, res));
  };
}
