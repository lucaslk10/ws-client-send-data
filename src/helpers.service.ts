import { post } from "request-promise";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";

export class HelpersService {
  /**
   * Creates a valid JWT token.
   * - It's necessary to communicate with another microservices.
   */
  createJwtToken = () =>
    sign({ email: "WebSocket Microservice" }, "brain", { expiresIn: "12h" });

  executeQuery = async (requestId: string, content: string) =>
    await post("https://stackqa.dimensiondata.com:3023/call-oracle/", {
      json: true,
      body: { requestId, content },
      auth: {
        bearer:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IldlYlNvY2tldCBGbHVpZyIsImlhdCI6MTU5MTIxNTQ0N30.nPVbSPIKG05iVBFDNRGtyiA5QB0CQTqmxcoftkDswkE",
      },
    });

  isJson(string: string) {
    try {
      return JSON.parse(string) && !!string;
    } catch (e) {
      return false;
    }
  }

  defineEnv() {
    dotenv.config();
    switch (process.env.NODE_ENV) {
      case "DEV":
        dotenv.config({ path: `${process.cwd()}/.env.dev` });
        break;

      case "QA":
        dotenv.config({ path: `${process.cwd()}/.env.qa` });
        break;

      case "PROD":
        dotenv.config({ path: `${process.cwd()}/.env.prod` });
        break;

      default:
        dotenv.config({ path: `${process.cwd()}/.env.dev` });
    }
  }
}
