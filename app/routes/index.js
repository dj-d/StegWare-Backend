const express = require('express');
const router = express.Router();

const attack = require('./subRoutes/attack');
// const device = require('./subRoutes/device');
const payload = require('./subRoutes/payload');

const HEALTH_CHECK_ENDPOINT = '/health_check';
const PAYLOAD_ENDPOINT = '/payload';
const ATTACK_ENDPOINT = '/attack';
// const DEVICE_ENDPOINT = '/device';

router.get(HEALTH_CHECK_ENDPOINT, function (req, res, next) {
    res.status(200)
        .json({
            message: 'It working...'
        });
})

router.use(PAYLOAD_ENDPOINT, payload);
router.use(ATTACK_ENDPOINT, attack);
// router.use(DEVICE_ENDPOINT, device);

module.exports = router;
