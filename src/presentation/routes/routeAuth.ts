import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { AuthService } from "../services/auth.services";
import { EmailService } from "../services/emailValidate.services";
import { envs } from "../../config";

export class AuthRoutes {
  static get routesAuth(): Router {
    const router = Router();

    const emailValidate = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );
    const authService = new AuthService(emailValidate);
    const authController = new AuthController(authService);
    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);
    return router;
  }
}
