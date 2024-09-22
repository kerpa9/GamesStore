import { Router } from "express";
import { PurchasesController } from "../controllers/purchases.controller";
import { PurchaseServices } from "../services/purchases.services";
import { AuthService } from "../services/auth.services";
import { VideoGamesServices } from "../services/videoGames.Services";
import { EmailService } from "../services/emailValidate.services";
import { envs } from "../../config";

export class PurchasesRoute {
  static get routePurchase(): Router {
    const routePurchase = Router();

    const emailValidate = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );

    const videoServices = new VideoGamesServices();
    const authService = new AuthService(emailValidate);
    const purchaseService = new PurchaseServices(authService, videoServices);
    const purchaseControler = new PurchasesController(purchaseService);

    routePurchase.post("/", purchaseControler.createPurchases);
    routePurchase.get("/", purchaseControler.getPurchases);
    routePurchase.get("/:id", purchaseControler.getPurchasesById);
    routePurchase.delete("/:id", purchaseControler.deletePurchases);

    return routePurchase;
  }
}
