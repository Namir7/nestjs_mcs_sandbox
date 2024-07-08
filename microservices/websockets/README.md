# Skufspace web-sockets service

## Env parametes:
- PORT [number]
- WS_COMPRESSION_ENABLED [boolean]
- WS_IDLE_TIMEOUT_IN_SEC [number]
- WS_MAX_CONNECTIONS_PER_USER [number]
- JWT_SECRET [string]
- INTERAPP_TOKEN [string]

## Start
To run application manually in dev env run bun "bun start:dev" command.
Otherwise "bun start" for production env.

## Endpoints


### Clients endpoints ( Authorization by jwt token )
- GET /connect <br>
&nbsp; Create ws connection

### Another services endpoints ( Authorization by Interapp token )
- POST /send <br>
&nbsp; Sends message to target clients

- GET /active <br>
&nbsp; Get active connections count