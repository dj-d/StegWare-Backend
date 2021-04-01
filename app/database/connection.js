'use strict'

const Mongoose = require('mongoose');
const config = require('./config/dbConfig');

const LOG_TAG = '\t[MONGODB]\t|';

Mongoose.connect(config.url, config.mongoOptions)
    .then(() => {
        console.log(LOG_TAG + 'Connected');
    })
    .catch((error) => {
        console.trace(error);
    });

Mongoose.connection.on('error', (error) => {
    if (error) {
        console.trace(error);
    }
});

Mongoose.Promise = global.Promise;

module.exports = {
    Mongoose, models: {
        payload: require('./schemas/payload.js'),
        attackResult: require('./schemas/attackResult.js')
    }
};
