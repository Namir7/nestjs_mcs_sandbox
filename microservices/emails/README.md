# Skufspace emails service

Service to send emails

## Prerequisite

node version >= `v20.13.1`

## Env parameters

`PORT`
`DEFAULT_LANG` - Enum [ 'en' | 'ru' ] 'ru' - default

`SKUFSPACE_URL`
`SKUFSPACE_TG`
`SKUFSPACEEMAIL`

`INTERAPP_TOKEN` - token for internal services interaction

`STATIC_URL` - static url path for images

`MAIL_SERVER_URL`
`MAIL_SERVER_USER`
`MAIL_SERVER_PASSWORD`

## Scripts

- build: `yarn build`
- run templates preview server: `yarn email:dev`
- run http server: `yarn start`
- run http in dev mode: `yarn start:dev`
