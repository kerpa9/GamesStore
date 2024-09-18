import { Subject } from "typeorm/persistence/Subject";
import { bcryptAdapter, envs } from "../../config";
import { JwtAdapter } from "../../config/jwtAdapter";
import { AuthModel } from "../../data/postgres/models/Auth.model";
import { CatchError } from "../../domain";
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
    user.password = bcryptAdapter.hash(registerDTO.password);

    try {
      await user.save();
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
      <h1>Validate tour email</h1>
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

  public validateEmail = async () => {};

  public async login(registerDTO: RegisterDTO) {}
}
