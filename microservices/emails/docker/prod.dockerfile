FROM node:20.13.1

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --prod
COPY src ./src
COPY tsconfig.json tsconfig.json ./

CMD ["yarn", "start"]