import * as WebSocket from 'ws';
import { Message } from './models/Message';
import { _helpersService } from './server';
import { socketClient } from './server';

/**
 * Timeout handler
 */
let pingTimeout: any;
/**
 * Heartbeat to dont lose connection
 * @param {WebSocket} ws
 */
function heartbeat(ws: any) {
  clearTimeout(pingTimeout);

  /**
   * Use `WebSocket#terminate()`, which immediately destroys the connection,
   * instead of `WebSocket#close()`, which waits for the close timer.
   * Delay should be equal to the interval at which your server
   * sends out pings plus a conservative assumption of the latency.
   */
  pingTimeout = setTimeout(() => {
    console.log(`terminate`);
    ws.terminate();
  }, 30000 + 1000);
}
function checkIntegration(message: string | Message) {
  if (typeof message === 'object') {
    /**
     * In content you can simply pass a SQL Query to Execute
     * in the microservice being called. Here we simulate Microservice with a function.
     */
    message.microservice == 'integration' ? dataCall(message.uId, message.content) : '';
  }
}

/**
 * as I said before, that function will simulate a Microservice that is running
 * in a private network or something.
 * Basically this microservice will execute instructions send in the 'content' like
 * an Database query, then will send back to the WebSocket messages.
 *
 * 'ws-integrate-api' do the rest. Check github repo @lucaslk10 / 'ws-integrate-api'
 *
 * @param uId Unique ID from the requisition
 * @param content Instructions to do in the Data Microservice
 */
function dataCall(uId: string, content: any) {
  /**
   * Example what you will do on the microservice data that
   * can calls any data resource that you want:
   *
   * const result = mongodb.find(JSON.parse(conent));
   */

  const result = { metadata: 'example' };

  const wsMsg: Message = {} as Message;

  wsMsg.uId = uId;
  wsMsg.return = true;
  wsMsg.isBroadcast = true;
  wsMsg.content = JSON.stringify(result);

  console.log(socketClient);
  socketClient.send(JSON.stringify(wsMsg));
}
export const setupWebSocket = () => {
  try {
    console.log('Connecting To WebSocket');
    console.log(new Date());

    const socket = new WebSocket('' + process.env.WS_SERVER);

    let interval: any;

    socket.onerror = function (err) {
      console.log('on error');

      clearTimeout(pingTimeout);
    };

    socket.onclose = function () {
      console.log('Connection Closed');
      console.log(new Date());

      setupWebSocket();
      clearTimeout(pingTimeout);
    };

    /**
     * Do a heartbeat when receives ping
     */
    socket.on('ping', (data) => {
      heartbeat(socket);
    });

    /**
     * Handle opened connection
     */
    socket.onopen = function (ws: WebSocket.OpenEvent) {
      try {
        clearInterval(interval);
        /**
         * Tells "I'm Alive"
         */
        heartbeat(socket);

        console.log('Connected');
        socket.send(`Listen WS Connected - ${new Date()}`);

        /**
         * Handle messages
         * @param {WebSocket.MessageEvent} event
         */
        socket.onmessage = (event) => {
          let message = _helpersService.isJson(event.data.toString())
            ? (JSON.parse(event.data.toString()) as Message)
            : event.data.toString();

          checkIntegration(message);
        };
      } catch (error) {
        console.log(error);
      }
    };

    return socket;
  } catch (error) {
    console.log('ERRO');
    console.log(error.message);
  }
};
