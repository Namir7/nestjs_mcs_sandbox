import { parseEnv } from "znv";
import { z } from "zod";

const configSchema = {
  PORT: z.number().default(3004),
  DEFAULT_LANG: z.enum(["ru", "en"]).default("ru"),

  SKUFSPACE_URL: z.string().default("https://example.com"),
  SKUFSPACE_TG: z.string().default("SkufspaceSupportBot"),
  SKUFSPACE_EMAIL: z.string().default("hello@example.com"),

  INTERAPP_TOKEN: z.string(),

  STATIC_URL: z.string().optional().default(""),

  // Activate

  //   MAIL_SERVER_URL: z.string(),
  //   MAIL_SERVER_USER: z.string(),
  //   MAIL_SERVER_PASSWORD: z.string(),
};

export const validateConfig = (env: Record<string, string | undefined>) => {
  parseEnv(env, configSchema);
};

export const getParam = <T = any>(value: keyof typeof configSchema): T => {
  return parseEnv(process.env, configSchema)[value] as T;
};
