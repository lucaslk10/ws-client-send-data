import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as cors from 'cors';
import { setupWebSocket } from './setupWebsocket';

import { HelpersService } from './helpers.service';
export const _helpersService = new HelpersService();
_helpersService.defineEnv();

const app = express();
app.use(cors());

/**
 * Start our http/s server
 */
const server = http.createServer(app);
export const socketClient: WebSocket | any = setupWebSocket();

/**
 * Start our server
 */
const listener = server.listen(process.env.PORT, () => {
  console.log(`WebSocket Listener started on port ${process.env.PORT}`);
});
