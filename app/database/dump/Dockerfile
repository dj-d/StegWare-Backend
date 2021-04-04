FROM mongo

ARG MONGO_INITDB_ROOT_USERNAME
ARG MONGO_INITDB_ROOT_PASSWORD
ARG MONGO_INITDB_DATABASE

COPY dump.json /dump.json

CMD mongoimport --host mongo --username ${MONGO_INITDB_ROOT_USERNAME} --password ${MONGO_INITDB_ROOT_PASSWORD} --authenticationMechanism SCRAM-SHA-1 --authenticationDatabase admin --db ${MONGO_INITDB_DATABASE} --collection payloads --type json --file /dump.json --jsonArray
