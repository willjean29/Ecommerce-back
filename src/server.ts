import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import Connection from "database/connection";
import routes from "routes";
import ENV from "utils/enviroments";
import { notFound, errorHandler } from "middlewares";
import { sortAndDeduplicateDiagnostics } from "typescript";

class LoginException extends Error {
  meta: string;
  data: string;
  httpCode: number;
  code: number;
  constructor(message: string, code: number, httpCode?: number) {
    super(message);
    this.meta = message;
    this.data = "holaa";
    this.code = code;
    this.httpCode = httpCode ? httpCode : code;
  }
}
class Server {
  private app;
  private host;
  private port;
  constructor() {
    this.app = express();
    this.port = ENV.API.PORT;
    this.host = ENV.API.HOST;

    // database
    new Connection();
    // Middlewares
    this.middlewares();

    // Routes App
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use("", routes);
    this.app.get("/test", (req, res) => {
      const error = new LoginException("Error de prueba", 400);
      console.log(error);
      throw error;
    });
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  listen() {
    this.app.listen(this.port as number, this.host, () => {
      console.log("Server on port : ", this.port);
    });
  }
}

export default Server;
