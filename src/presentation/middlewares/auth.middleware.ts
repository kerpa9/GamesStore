import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwtAdapter";
import { AuthModel } from "../../data/postgres/models/Auth.model";
import { ReturningStatementNotSupportedError } from "typeorm";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization)
      return res.status(401).json({ message: "No token provided" });
    if (!authorization.startsWith("Bearer"))
      return res.status(401).json({ message: "No token provided" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: number }>(token);

      if (!payload) return res.status(401).json({ message: "Invalid token" });
      console.log(payload);

      const user = await AuthModel.findOne({
        where: {
          id: payload.id,
          status: Status.ACTIVE,
          emailValidated: true,
        },
      });

      if (!user) return res.status(401).json({ message: "Invalid user" });
      next();
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    console.log(token);
  }
}
