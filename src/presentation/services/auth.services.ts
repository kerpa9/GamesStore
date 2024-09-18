import { bcryptAdapter } from "../../config";
import { JwtAdapter } from "../../config/jwtAdapter";
import { AuthModel } from "../../data/postgres/models/Auth.model";
import { CatchError } from "../../domain";
import { RegisterDTO } from "../../domain/dtos/auth/registerUser.DTO";

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

export class AuthService {
  constructor() {}

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

  public async login(registerDTO: RegisterDTO) {}
}
