#!/bin/bash

echo '1. run rabbit'

docker run -d --name skufspace-rmq --hostname skufspace-rmq --network skufspace-network --publish 5672:5672 --publish 15672:15672 rabbitmq:3-management

echo '2. run databases'

docker compose --file microservices/notifications/docker-compose.yaml up mongo --detach
docker compose --file microservices/surveys/docker-compose.yaml up postgres --detach

echo '3. run apps'

gnome-terminal --tab --title=notifications -- bash -c "sleep 1s; yarn --cwd microservices/notifications start:dev"
gnome-terminal --tab --title=surveys -- bash -c "sleep 1s; yarn --cwd microservices/surveys start:dev"
gnome-terminal --tab --title=websockets -- bash -c "sleep 1s; yarn --cwd microservices/websockets start:dev"
gnome-terminal --tab --title=emails -- bash -c "sleep 1s; yarn --cwd microservices/emails start:dev"
gnome-terminal --tab --title=gateway -- bash -c "sleep 1s; yarn --cwd microservices/gateway start:dev"
