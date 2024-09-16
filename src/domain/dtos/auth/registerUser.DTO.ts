import { regularExps } from "../../../config";

export class RegisterDTO {
  private constructor(
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterDTO?] {
    const { first_name, last_name, email, password } = object;

    if (!first_name) return ["Missing firstname"];
    if (!last_name) return ["Missing lastname"];
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

    return [undefined, new RegisterDTO(first_name, last_name, email, password)];
  }
}
