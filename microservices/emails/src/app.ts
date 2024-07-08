import express from "express";
import "./i18n";
import { applyMiddlewares, applyRoutes } from "./common/utils";
import { AuthGuard, JsonBodyParser } from "common/middlewares";
import { NotFound, PreviewTemplate, SendEmail } from "common/routes";

const app = express();

applyMiddlewares(app, JsonBodyParser, AuthGuard);
applyRoutes(app, PreviewTemplate, SendEmail, NotFound);

export const bootstrap = (port: number) =>
  app.listen(port, () => {
    console.log(`\nEmails service listening on port: ${port}`);
  });
