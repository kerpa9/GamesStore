import { ReturningStatementNotSupportedError } from "typeorm";
import { bcryptAdapter, envs } from "../../config";
import { JwtAdapter } from "../../config/jwtAdapter";
import { AuthModel } from "../../data/postgres/models/Auth.model";
import { CatchError } from "../../domain";
import { LoginDTO } from "../../domain/dtos/auth/loginUser.DTO";
import { RegisterDTO } from "../../domain/dtos/auth/registerUser.DTO";
import { EmailService } from "./emailValidate.services";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

export class AuthService {
  constructor(private readonly emailServices: EmailService) {}

  public async register(registerDTO: RegisterDTO) {
    const existUser = await AuthModel.findOne({
      where: { status: Status.ACTIVE, email: registerDTO.email },
    });

    if (existUser) throw CatchError.badRequest("Email already exist");

    const user = new AuthModel();
    user.first_name = registerDTO.first_name;
    user.last_name = registerDTO.last_name;
    user.email = registerDTO.email;
    user.password = registerDTO.password;

    try {
      await user.save();
      await this.sendEmailValidate(user.email);
      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CatchError.internalServer("Error while creating JWT");
      return {
        token,
        user,
      };
    } catch (err: any) {
      throw CatchError.internalServer(err);
    }
  }

  public sendEmailValidate = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });

    if (!token) throw CatchError.internalServer("Error getting token");

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate tour email : ${email}</a>
    `;

    const isSent = this.emailServices.sendEmail({
      to: email,
      subject: "validate your email",
      htmlBody: html,
    });

    if (!isSent) throw CatchError.internalServer("Error sending email");
    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);

    if (!payload) throw CatchError.unAuthorized("Invalid Token");

    const { email } = payload as { email: string };

    if (!email) throw CatchError.internalServer("Email not in token");

    const user = await AuthModel.findOne({ where: { email } });

    if (!user) throw CatchError.internalServer("Email not exist");

    user.emailValidated = true;

    try {
      await user.save();
      return true;
    } catch (error) {
      throw CatchError.internalServer("Something went very wrong");
    }
  };

  public async login(loginDTO: LoginDTO) {
    const user = await AuthModel.findOne({
      where: { email: loginDTO.email, status: Status.ACTIVE },
    });
    if (!user) throw CatchError.unAuthorized("Invalid credentials");

    const isMatching = bcryptAdapter.compare(loginDTO.password, user.password);

    if (!isMatching) throw CatchError.unAuthorized("Invalid credentials");

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) throw CatchError.internalServer("Error while creating JWT");
    return {
      token: token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
      },
    };
  }

  public async getProfile(id: number) {
    const logged = await AuthModel.findOne({
      where: { id, status: Status.ACTIVE },
    });

    if (!logged) throw CatchError.notFound(`This ${id} not found`);

    return logged;
  }
}
