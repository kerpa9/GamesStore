import { Router } from "express";
import { PurchasesController } from "../controllers/purchases.controller";

export class PurchasesRoute {
  static get routePurchase(): Router {
    const routePurchase = Router();

    const purchaseControler = new PurchasesController();

    routePurchase.get("/", purchaseControler.getPurchases);

    return routePurchase;
  }
}
