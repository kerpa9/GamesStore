import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";

export class AuthRoutes {
  static get routesAuth(): Router {
    const router = Router();

    const authController = new AuthController();
    router.post("/login", authController.login);
    router.post("/register", authController.register);
    return router;
  }
}
