#!/bin/sh

echo '1. start clone from remote'

mkdir microservices
cd microservices

git clone <remote/notifications-repo> notifications
git clone <remote/surveys-repo> surveys
git clone <remote/websockets-repo> websockets
git clone <remote/emails-repo> emails
git clone <remote/gateway-repo> gateway

cd ../

git clone <remote/lib-repo> lib

echo '2. init enviroment variables'

cp microservices/notifications/.example.env microservices/notifications/.env
cp microservices/surveys/.example.env microservices/surveys/.env
cp microservices/websockets/.example.env microservices/websockets/.env
cp microservices/emails/.example.env microservices/emails/.env
cp microservices/gateway/.example.env microservices/gateway/.env

echo '3. install packages'

yarn install --cwd lib
yarn --cwd lib build

yarn install --cwd microservices/notifications
yarn install --cwd microservices/surveys
yarn install --cwd microservices/websockets
yarn install --cwd microservices/emails
yarn install --cwd microservices/gateway

echo '4. init docker db data file'

mkdir -p microservices/notifications/.data/mongo
mkdir -p microservices/surveys/.data/postgres

echo '5. create docker project network'

docker network create skufspace-network

echo '6. run migrations / schema update'

docker compose --file microservices/notifications/docker-compose.yaml up mongo --detach
docker compose --file microservices/surveys/docker-compose.yaml up postgres --detach

sleep 15s

yarn --cwd microservices/notifications db:push
yarn --cwd microservices/surveys mig:run

docker compose --file microservices/notifications/docker-compose.yaml down
docker compose --file microservices/surveys/docker-compose.yaml down

echo '7. generate prisma schema'

yarn --cwd microservices/notifications prisma:gen
yarn --cwd microservices/surveys prisma:gen

echo '8. run seeds'

docker compose --file microservices/notifications/docker-compose.yaml up mongo --detach
docker compose --file microservices/surveys/docker-compose.yaml up postgres --detach

sleep 15s

yarn --cwd microservices/notifications seed:run
yarn --cwd microservices/surveys seed:run

docker compose --file microservices/notifications/docker-compose.yaml down
docker compose --file microservices/surveys/docker-compose.yaml down
