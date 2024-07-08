import type { Server } from "bun";
import { Exception } from "./common/exception";
import {
  BadRequestException,
  TooManyRequests,
  UnauthorizedException,
} from "./common/exceptions";
import { SendDto, validateSendDto } from "./dto/send.dto";
import { Errors } from "./enums/errors.enum";
import { ConfigService } from "./services/config.service";
import { JwtService } from "./services/jwt.service";
import type { JwtPayload } from "./types/jwt-payload.type";
import { StorageService } from "./services/storage.service";

export class Router {
  private storageService: StorageService;
  private configService: ConfigService;
  private jwtService: JwtService;

  private _maxConnections: number;

  constructor() {
    this.configService = new ConfigService();
    this.jwtService = new JwtService();
    this.storageService = new StorageService();

    this._maxConnections = this.configService.get<number>(
      "ws.maxConnectionsPerUser"
    );
  }

  connect(req: Request, server: Server, userId: string) {
    const activeSockets = this.storageService.getSockets(userId);

    if (activeSockets && activeSockets.size >= this._maxConnections) {
      throw new TooManyRequests(Errors.TOO_MANY_CONNECTIONS);
    }

    server.upgrade(req, {
      data: {
        userId,
      },
    });

    return new Response();
  }

  getActive() {
    const socketsCount = this.storageService.getCount();

    return new Response(String(socketsCount), { status: 200 });
  }

  async send(req: Request) {
    const dto = await this.parseBody<SendDto>(req);

    console.log("dto", dto);

    const valid = validateSendDto(dto as SendDto);

    if (!valid) {
      throw new BadRequestException(Errors.NOT_VALID);
    }

    let counter = 0;

    for (const client of dto.clients) {
      const sockets = this.storageService.getSockets(client);

      if (!sockets) {
        continue;
      }

      for (const socket of [...sockets]) {
        await socket.send(
          JSON.stringify({
            data: dto.data,
            event: dto.event,
          })
        );

        counter++;
      }
    }

    return new Response(String(counter), { status: 200 });
  }

  default(req?: Request) {
    return new Response("", { status: 403 });
  }

  handleAuthJwt(req: Request): string {
    // "Authorization": "Bearer <jwt>"
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException(Errors.JWT_NOT_PROVIDED);
    }

    const valid = this.jwtService.validate(token);

    if (!valid) {
      throw new UnauthorizedException(Errors.JWT_NOT_VALID);
    }

    const { uuid } = this.jwtService.parse<JwtPayload>(token);

    if (!uuid) {
      throw new UnauthorizedException(Errors.JWT_NOT_VALID);
    }

    return uuid;
  }

  handleAuthInterApp(req: Request): void {
    const token = req.headers.get("x-inter-app");

    if (!token) {
      throw new UnauthorizedException(Errors.INTERAPP_NOT_VALID);
    }

    const sourceToken = this.configService.get<string>("interappToken");

    if (sourceToken !== token) {
      throw new UnauthorizedException(Errors.INTERAPP_NOT_VALID);
    }
  }

  handleException(error: Error | Exception) {
    return error instanceof Exception
      ? new Response(error.message, {
          status: error.status,
        })
      : new Response(Errors.INTERNAL_SERVER_ERROR, {
          status: 500,
        });
  }

  async parseBody<T = any>(req: Request): Promise<T> {
    let result;

    try {
      result = await req.json();
    } catch (error) {
      throw new BadRequestException(Errors.JSON_PARSE_ERROR);
    }

    return result as T;
  }
}
