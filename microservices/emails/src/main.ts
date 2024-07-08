import { validateConfig } from "services/config";
import { bootstrap } from "./app";

validateConfig(process.env);

const port = parseInt(process.env.PORT!);

bootstrap(port);
