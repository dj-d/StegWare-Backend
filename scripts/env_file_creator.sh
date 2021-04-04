#!/bin/bash

CONFIG="config.json"
#PATH=$(pwd)

cd .. || exit

if [ -f ".env" ] ;
  then
    rm .env
  fi

touch .env

{
  echo "SERVER_PORT=$(jq .backend.SERVER_PORT $CONFIG)"

  echo "FRONTEND_ORIGINS=$(jq .frontend.FRONTEND_ORIGINS $CONFIG)"

  echo "MONGO_INITDB_DATABASE=$(jq .db.MONGO_INITDB_DATABASE $CONFIG)"
  echo "MONGO_INITDB_ROOT_USERNAME=$(jq .db.MONGO_INITDB_ROOT_USERNAME $CONFIG)"
  echo "MONGO_INITDB_ROOT_PASSWORD=$(jq .db.MONGO_INITDB_ROOT_PASSWORD $CONFIG)"
  echo "MONGO_PORT=$(jq .db.MONGO_PORT $CONFIG)"
  echo "MONGO_AUTH_SOURCE=$(jq .db.MONGO_AUTH_SOURCE $CONFIG)"
} >> .env

exit 0
