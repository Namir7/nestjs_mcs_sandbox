import bodyParser from "body-parser";
import { Express } from "express";
import { getParam } from "services/config";

const interappToken = getParam("INTERAPP_TOKEN");

export const JsonBodyParser = (app: Express) => app.use(bodyParser.json());

export const AuthGuard = (app: Express) =>
  app.use((req, res, next) => {
    const header = req.headers["x-inter-app"];

    if (!header || interappToken !== header) {
      return res.status(401).send("Unauthorized");
    }

    next();
  });
