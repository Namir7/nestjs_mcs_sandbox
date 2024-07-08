import { verify, decode } from "jsonwebtoken";
import { ConfigService } from "./config.service";

export class JwtService {
  private secret: string;

  constructor() {
    const configService = new ConfigService();

    const secret = configService.get<string>("jwt.secret");

    this.secret = secret;
  }

  parse<T>(token: string): T {
    return decode(token) as T;
  }

  validate(token: string): boolean {
    try {
      verify(token, this.secret);

      return true;
    } catch {
      return false;
    }
  }
}
