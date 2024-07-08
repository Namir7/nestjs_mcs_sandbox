import { parseEnv } from "znv";
import { z } from "zod";

interface Config {
  port: number;

  ws: {
    compressionEnabled: boolean;
    idleTimeoutInSec: number;
    maxConnectionsPerUser: number;
  };

  jwt: {
    secret: string;
  };

  interappToken: string;
}

const WS_COMPRESSION_ENABLED_DEFAULT = false;
const WS_IDLE_TIMEOUT_IN_SEC_DEFAULT = 120;
const WS_MAX_CONNECTIONS_PER_USER_DEFAULT = 10;

const EnvSchema = {
  PORT: z.number(),
  WS_COMPRESSION_ENABLED: z
    .boolean()
    .optional()
    .default(WS_COMPRESSION_ENABLED_DEFAULT),
  WS_IDLE_TIMEOUT_IN_SEC: z
    .number()
    .optional()
    .default(WS_IDLE_TIMEOUT_IN_SEC_DEFAULT),
  WS_MAX_CONNECTIONS_PER_USER: z
    .number()
    .optional()
    .default(WS_MAX_CONNECTIONS_PER_USER_DEFAULT),
  JWT_SECRET: z.string(),
  INTERAPP_TOKEN: z.string(),
};

export class ConfigService {
  private config: Config;

  constructor() {
    this.config = this._parse();
  }

  get(): Config;
  get<T>(field: string): T;
  get<T = Config>(field?: string) {
    if (field) {
      return this._getField(field, this.config) as T;
    } else {
      return this.config as Config;
    }
  }

  private _parse(): Config {
    const {
      PORT,
      WS_COMPRESSION_ENABLED,
      WS_IDLE_TIMEOUT_IN_SEC,
      WS_MAX_CONNECTIONS_PER_USER,
      JWT_SECRET,
      INTERAPP_TOKEN,
    } = parseEnv(process.env, EnvSchema);

    return {
      port: PORT,
      ws: {
        compressionEnabled: WS_COMPRESSION_ENABLED,
        idleTimeoutInSec: WS_IDLE_TIMEOUT_IN_SEC,
        maxConnectionsPerUser: WS_MAX_CONNECTIONS_PER_USER,
      },
      jwt: {
        secret: JWT_SECRET,
      },
      interappToken: INTERAPP_TOKEN,
    };
  }

  private _rejectMessage(name: string, value: unknown) {
    return `"${name}" not defined or not valid: ${value}`;
  }

  private _getField(pattern: string, payload: Record<string, any>): unknown {
    /*
      pattern: "a.b.c"
      payload: { a: { b: { c: { ... } } } }
    */

    if (pattern === "") {
      return payload;
    }

    const searchProp = pattern.split(".")[0];
    const newPattern = pattern.split(".").slice(1).join(".");

    return this._getField(newPattern, payload[searchProp]);
  }
}
