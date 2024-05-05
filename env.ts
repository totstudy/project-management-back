import Env from "@ioc:Adonis/Core/Env";

export default Env.rules({
  HOST: Env.schema.string({ format: "host" }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(["local"] as const),
  NODE_ENV: Env.schema.enum(["development", "production", "test"] as const),
  DB_CONNECTION: Env.schema.string(),
  PG_HOST: Env.schema.string({ format: "host" }),
  PG_PORT: Env.schema.number(),
  PG_USER: Env.schema.string(),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_DB_NAME: Env.schema.string(),
  SESSION_DRIVER: Env.schema.string(),
});
