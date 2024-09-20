import { Router } from "express";
import { PurchasesController } from "../controllers/purchases.controller";

export class PurchasesRoute {
  static get routePurchase(): Router {
    const routePurchase = Router();

    routePurchase.get("/", PurchasesController.getPurchases);

    return routePurchase;
  }
}
