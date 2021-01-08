'use strict';

let dbDefaultCredential = require('./dbDefaultCredential.json');

const username = process.env.MONGO_USER || dbDefaultCredential.db.username;
const password = process.env.MONGO_PASSWORD || dbDefaultCredential.db.password;
const port = process.env.MONGO_PORT || dbDefaultCredential.db.port;
const host = process.env.DOCKER_RUNNING ? "mongo" : dbDefaultCredential.db.host;
const dbname = process.env.MONGO_DATABASE || dbDefaultCredential.db.name;
const authSource = process.env.AUTH_SOURCE || dbDefaultCredential.db.authSource;

const url = 'mongodb://' +
    username + ':' +
    password + '@' +
    host + ':' +
    port + '/' +
    dbname+ '?authSource=' +
    authSource;

const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true };

module.exports = {url, mongoOptions};
