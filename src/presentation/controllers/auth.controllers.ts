import { Request, Response } from "express";
import { CatchError } from "../../domain";
import { AuthService } from "../services/auth.services";
import { RegisterDTO } from "../../domain/dtos/auth/registerUser.DTO";
import { LoginDTO } from "../../domain/dtos/auth/loginUser.DTO";

export class AuthController {
  constructor(public readonly authServices: AuthService) {}

  private handleError = (err: unknown, res: Response) => {
    if (err instanceof CatchError)
      return res.status(err.statusCode).json({ message: err.message });
    console.log(err);
    return res.status(500).json({ message: "Something went very wrong!" });
  };

  register = async (req: Request, res: Response) => {
    const [error, registerDTO] = RegisterDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });
    // Validate tiping
    // console.log(req.file);
    // console.log(req.files);
    // const file = req.file;

    this.authServices
      .register(registerDTO!, req.file)
      .then((data) => res.status(200).json(data))
      .catch((err: any) => this.handleError(err, res));
  };

  login = async (req: Request, res: Response) => {
    const [error, loginUserDTO] = LoginDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });
    this.authServices
      .login(loginUserDTO!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  validateEmail = async (req: Request, res: Response) => {
    const { token } = req.params;

    this.authServices
      .validateEmail(token)
      .then(() => res.json("Email was validated properly"))
      .catch((error) => this.handleError(error, res));
  };

  getProfileLogged = async (req: Request, res: Response) => {
    const { id } = req.body.sesionUser;

    this.authServices
      .getProfile(+id)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
