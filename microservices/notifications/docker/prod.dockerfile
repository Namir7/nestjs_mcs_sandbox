FROM node:16-alpine3.16

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --prod
RUN npm install -g @nestjs/cli

COPY src ./src
COPY prisma ./prisma
COPY nest-cli.json tsconfig.json tsconfig.build.json ./

RUN yarn prisma:gen
RUN yarn build

CMD [ "yarn", "run", "start"]