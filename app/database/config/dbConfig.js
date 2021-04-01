'use strict';

let dbDefaultCredential = require('./dbDefaultCredential.json');

const username = process.env.MONGO_USER || dbDefaultCredential.db.username;
const password = process.env.MONGO_PASSWORD || dbDefaultCredential.db.password;
const port = process.env.MONGO_PORT || dbDefaultCredential.db.port;
const host = process.env.DOCKER_RUNNING ? 'mongo' : dbDefaultCredential.db.host;
const dbName = process.env.MONGO_DATABASE || dbDefaultCredential.db.name;
const authSource = process.env.AUTH_SOURCE || dbDefaultCredential.db.authSource;

const url = 'mongodb://' +
    username + ':' +
    password + '@' +
    host + ':' +
    port + '/' +
    dbName+ '?authSource=' +
    authSource;

const mongoOptions = {
	user: username,
	pass: password,
	dbName: dbName,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
	autoIndex: false
};

module.exports = {
	url,
	mongoOptions
};
