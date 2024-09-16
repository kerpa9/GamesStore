import { genSaltSync, hashSync } from "bcrypt";

export const bcryptAdapter = {
  hash: (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  },
};
