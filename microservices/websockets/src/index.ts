import { runServer } from "./server";
import { ConfigService } from "./services/config.service";

const configService = new ConfigService();

const port = configService.get<number>("port");
const perMessageDeflate = configService.get<boolean>("ws.compressionEnabled");
const idleTimeout = configService.get<number>("ws.idleTimeoutInSec");

const bootstrap = () => {
  runServer(port, { perMessageDeflate, idleTimeout });

  console.log(`\nWeb-socket service listening on port: ${port}`);
};

bootstrap();
