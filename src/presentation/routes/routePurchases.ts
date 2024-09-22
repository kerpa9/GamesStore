import { Router } from "express";
import { PurchasesController } from "../controllers/purchases.controller";
import { PurchaseServices } from "../services/purchases.services";
import { AuthService } from "../services/auth.services";
import { VideoGamesServices } from "../services/videoGames.Services";
import { EmailService } from "../services/emailValidate.services";
import { envs } from "../../config";
import { AuthMiddleware } from "../middlewares/auth.middleware";

enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

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

    routePurchase.use(AuthMiddleware.protect);
    routePurchase.post("/", purchaseControler.createPurchases);
    //AuthMiddleware.validateRestricRole Verify the user's role
    routePurchase.get(
      "/",
      AuthMiddleware.validateRestricRole(Role.ADMIN),
      purchaseControler.getPurchases
    );
    routePurchase.get("/:id", purchaseControler.getPurchasesById);
    routePurchase.delete("/:id", purchaseControler.deletePurchases);

    return routePurchase;
  }
}
