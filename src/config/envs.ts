import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DATABASE_HOST: get("DATABASE_HOST").required().asString(),
  DATABASE_PORT: get("DATABASE_PORT").required().asPortNumber(),
  DATABASE_USERNAME: get("DATABASE_USERNAME").required().asString(),
  DATABASE_PASSWORD: get("DATABASE_PASSWORD").required().asString(),
  DATABASE_DATABASE: get("DATABASE_DATABASE").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  SEND_EMAIL: get("SEND_EMAIL").required().asBool(),
};
