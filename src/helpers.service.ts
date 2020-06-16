import { post } from 'request-promise';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

export class HelpersService {
  /**
   * Creates a valid JWT token.
   * - It's necessary to communicate with another microservices.
   */
  // createJwtToken = () => sign({ email: 'WebSocket Microservice' }, '', { expiresIn: '12h' });

  // executeQuery = async (requestId: string, content: string) =>
  //   await post('ENDPOINT_TO_CALL_DB', {
  //     json: true,
  //     body: { requestId, content },
  //     auth: {
  //       bearer:
  //         this.createJwtToken(),
  //     },
  //   });

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
      case 'DEV':
        dotenv.config({ path: `${process.cwd()}/.env.dev` });
        break;

      case 'QA':
        dotenv.config({ path: `${process.cwd()}/.env.qa` });
        break;

      case 'PROD':
        dotenv.config({ path: `${process.cwd()}/.env.prod` });
        break;

      default:
        dotenv.config({ path: `${process.cwd()}/.env.dev` });
    }
  }
}
