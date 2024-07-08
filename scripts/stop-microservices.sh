#!/bin/bash

echo '1. remove rabbit'

docker stop skufspace-rmq
docker rm skufspace-rmq

echo '2. stop databases'

docker stop notifications-service-db && docker rm notifications-service-db
docker stop surveys-service-db && docker rm surveys-service-db

echo '3. stop apps'

docker stop notifications-service-app && docker rm notifications-service-app
docker stop surveys-service-app && docker rm surveys-service-app
docker stop websockets-service-app && docker rm websockets-service-app
docker stop emails-service-app && docker rm emails-service-app
docker stop gateway-service-app && docker rm gateway-service-app
