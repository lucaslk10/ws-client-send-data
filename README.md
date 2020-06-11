<p align="center">
  <a href="https://www.websocket.org/" target="blank"><img src="https://opensource.com/sites/default/files/images/life-uploads/websocket.png" width="120" alt="WebSocket Logo" /></a>
  <a href="#" target="blank"><img src="https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png" width="120" alt="TypeScript Logo" /></a>
</p>

## Description

The purpose of this application is to runs a WebSocket Client that triggers a call to an external service and return data to WebSocket, that in the end will return in the API from the 'ws-server-api' repo example.

WebSockets are very useful and fast, in any kind of situations that you want to create communication trough differente services.

That's a simple implementation, not using SSL(WSS) and not doing WS Handshake, but it still very helpful.

## Techs

TypeScript
WebSocket

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start:dev

# production mode
$ yarn build && yarn start:prod
```

## To Do

WSS Auth

Automated Tests

## Stay in touch

- Author - [Lucas Santana]
- Linkedin - [@lucasgustavosantana](https://www.linkedin.com/in/lucasgustavosantana/)

## License

[MIT licensed](LICENSE).
