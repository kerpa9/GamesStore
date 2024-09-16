import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { AuthService } from "../services/auth.services";

export class AuthRoutes {
  static get routesAuth(): Router {
    const router = Router();

    const authService = new AuthService();
    const authController = new AuthController(authService);
    router.post("/login", authController.login);
    router.post("/register", authController.register);
    return router;
  }
}
