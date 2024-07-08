FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --prod
RUN npm install -g @nestjs/cli

COPY src ./src
COPY nest-cli.json tsconfig.json tsconfig.build.json ./

RUN yarn build

CMD [ "yarn", "run", "start" ]