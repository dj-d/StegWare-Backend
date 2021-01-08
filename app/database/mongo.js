const Mongoose = require('mongoose');
const config = require('../config/dbConfig');

// DB connection
Mongoose.connect(config.url, config.mongoOptions);

// DB connection error
Mongoose.connection.on('error', (err) => {
    if (err) {
        throw err;
    }
});

Mongoose.Promise = global.Promise;

module.exports = {
    Mongoose, models: {
        payload: require('./schemas/payload'),
        attackResult: require('./schemas/attackResult')
    }
};
