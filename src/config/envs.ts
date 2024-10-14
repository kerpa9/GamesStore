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
  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
  API_KEY: get("API_KEY").required().asString(),
  AUTH_DOMAIN: get("AUTH_DOMAIN").required().asString(),
  PROJECT_ID: get("PROJECT_ID").required().asString(),
  STORAGE_BUCKET: get("STORAGE_BUCKET").required().asString(),
  MESSAGING_SENDER_ID: get("MESSAGING_SENDER_ID").required().asString(),
  APP_ID: get("APP_ID").required().asString(),
};
