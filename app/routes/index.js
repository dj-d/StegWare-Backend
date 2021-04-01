const express = require('express');
const router = express.Router();

const attack = require('./subRoutes/attack');
// const device = require('./subRoutes/device');
const healthCheck = require('./subRoutes/healthCheckl');
const payload = require('./subRoutes/payload');

const HEALTH_CHECK_ENDPOINT = '/health_check';
const PAYLOAD_ENDPOINT = '/payload';
const ATTACK_ENDPOINT = '/attack';
// const DEVICE_ENDPOINT = '/device';

router.route('*')
    .get((req, res) => {
        console.log('GET - Fall back');

        res.status(404)
            .json({message: 'Route Not Found'});
    })
    .post((req, res) => {
        console.log('POST - Fall back');

        res.status(404)
            .json({message: 'Route Not Found'});
    })
    .delete((req, res) => {
        console.log('DELETE - Fall back');

        res.status(404)
            .json({message: 'Route Not Found'});
    })
    .put((req, res) => {
        console.log('PUT - Fall back');

        res.status(404)
            .json({message: 'Route Not Found'});
    })

router.use(HEALTH_CHECK_ENDPOINT, healthCheck);
router.use(PAYLOAD_ENDPOINT, payload);
router.use(ATTACK_ENDPOINT, attack);
// router.use(DEVICE_ENDPOINT, device);

module.exports = router;
