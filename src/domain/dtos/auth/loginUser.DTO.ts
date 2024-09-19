import { regularExps } from "../../../config";

export class LoginDTO {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginDTO?] {
    const { email, password } = object;
    if (!email) return ["Invalid email"];
    if (!regularExps.email.test(email)) return ["Invalid email"];
    if (!password)
      return [
        "Password is missing or not accepted if its length is less than ten characters.",
      ];
    if (!regularExps.password.test(password))
      return [
        "Password is missing or not accepted if its length is less than ten characters.",
      ];

    return [undefined, new LoginDTO(email, password)];
  }
}
