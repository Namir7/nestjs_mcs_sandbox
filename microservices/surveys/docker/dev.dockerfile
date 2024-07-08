FROM node:16-alpine3.16

WORKDIR /app

CMD [ "npm", "run", "start:dev" ]