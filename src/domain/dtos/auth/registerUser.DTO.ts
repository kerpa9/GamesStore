export class RegisterDTO {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static register(object: { [key: string]: any }): [string?, RegisterDTO?] {
    const { email, password } = object;

    if (!email) return ["Missing name"];
    if (!password || password.length < 10)
      return [
        "Description is missing or not accepted if its length is less than ten characters.",
      ];

    return [undefined, new RegisterDTO(email, password)];
  }
}
