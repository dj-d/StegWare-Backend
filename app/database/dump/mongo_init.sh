#! /bin/bash

mongoimport --db $MONGO_INITDB_DATABASE --collection payloads --drop --type json --file /docker-entrypoint-initdb.d/dump.json --jsonArray
