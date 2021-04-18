require('dotenv').config();

const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(helmet());

const PORT = process.env.SERVER_PORT || 3333;
const FRONTEND_ORIGINS = process.env.FRONTEND_ORIGINS.split(',') || 'localhost';
let ORIGINS = [];

for (let host of FRONTEND_ORIGINS) {
    let origin = ('http://' + host);
    origin = origin.replace(/\s/g, '');
    ORIGINS.push(origin);
}

let corsOptions = {
    allowedHeaders: ['Content-Type'],
    preflightContinue: true,
    origin: ORIGINS
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', router);

app.use((req, res) => {
    res.status(404);
})

app.listen(PORT);

console.log('Server running on internal port: ' + PORT);

module.exports = app;
