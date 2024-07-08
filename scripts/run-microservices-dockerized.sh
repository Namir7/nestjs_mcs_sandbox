#!/bin/bash

echo '1. run rabbit'

docker run -d --name skufspace-rmq --hostname skufspace-rmq --network skufspace-network --publish 5672:5672 --publish 15672:15672 rabbitmq:3-management

echo '2. run databases'

docker compose --file microservices/notifications/docker-compose.yaml up mongo --detach
docker compose --file microservices/surveys/docker-compose.yaml up postgres --detach

echo '3. run apps'

docker compose --file microservices/notifications/docker-compose.yaml up app --detach
docker compose --file microservices/surveys/docker-compose.yaml up app --detach
docker compose --file microservices/websockets/docker-compose.yaml up app --detach
docker compose --file microservices/emails/docker-compose.yaml up app --detach
docker compose --file microservices/gateway/docker-compose.yaml up app --detach
