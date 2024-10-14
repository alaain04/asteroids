// import * as bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import Modules from "./modules";
import { errors } from "celebrate";
import config from "./helpers/config";
import { NotFoundResponse } from "./helpers/error";
import { errorMiddleware } from "./middlewares/error.middleware";

export class AppServer {
  protected app: express.Application = express();

  createServer() {
    this.app.use(cors());

    // this.app.use(bodyParser.json());
    // this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
      next();
    });

    const modules = new Modules();
    this.app.use("/api/", modules.path());

    this.app.use(errorMiddleware);
    this.app.use(errors()); // * JOI errors

    this.app.listen(config.PORT, () => {
      console.log(`Server Running on port: ${config.PORT}`);
    });

    this.app.use((req, res) => {
      NotFoundResponse(res, `URL: ${req.originalUrl} not found.`);
    });
  }
}
