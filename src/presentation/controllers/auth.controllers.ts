import { Request, Response } from "express";
import { CatchError } from "../../domain";
import { AuthService } from "../services/auth.services";

export class AuthController {
  constructor(public readonly authServices: AuthService) {}

  private handleError = (err: unknown, res: Response) => {
    if (err instanceof CatchError)
      return res.status(err.statusCode).json({ message: err.message });
    console.log(err);
    return res.status(500).json({ message: "Something went very wrong!" });
  };

  register = async (req: Request, res: Response) => {
    return res.status(200).json({ message: "Register" });
  };

  login = async (req: Request, res: Response) => {
    return res.status(200).json({ message: "login" });
  };
}
