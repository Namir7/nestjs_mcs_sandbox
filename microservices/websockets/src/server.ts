import type { Exception } from "./common/exception";
import { Router } from "./router";
import { StorageService } from "./services/storage.service";
import type { WsData } from "./types/ws-data-payload.type";

type Options = {
  perMessageDeflate: boolean;
  idleTimeout: number;
};

const router = new Router();
const storageService = new StorageService();

export const runServer = (port: number, options: Options) =>
  Bun.serve<WsData>({
    port,
    fetch(req, server) {
      const url = new URL(req.url);

      if (req.method === "GET" && url.pathname === "/connect") {
        const userId = router.handleAuthJwt(req);

        return router.connect(req, server, userId);
      }

      if (req.method === "POST" && url.pathname === "/send") {
        router.handleAuthInterApp(req);

        return router.send(req);
      }

      if (req.method === "GET" && url.pathname === "/active") {
        router.handleAuthInterApp(req);

        return router.getActive();
      }

      return router.default();
    },
    error(err) {
      console.error("error occured: ", err.message);

      return router.handleException(err as Error | Exception);
    },
    websocket: {
      message(ws, message) {},
      open(ws) {
        storageService.pushSocket(ws.data.userId, ws);
      },
      close(ws) {
        storageService.removeSocket(ws.data.userId, ws);
      },
      sendPings: true,
      perMessageDeflate: options.perMessageDeflate,
      idleTimeout: options.idleTimeout,
    },
  });
