const express = require('express');
const router = express.Router();

const payload = require('../../database/models/Payload');

router.get('/', (req, res) => {
    const payload_id = req.query.payload_id;

    if (payload_id) {
        payload.readOneById(payload_id)
            .then((payload) => {
                if (payload) {
                    res.json(payload);
                } else {
                    res.status(404)
                        .json({
                            error: 'Payload not found'
                        });
                }
            })
            .catch((error) => {
                res.status(error.status)
                    .json({
                        error: error.message
                    });
            })
    } else {
        payload.readAll()
            .then((payload) => {
                res.json(payload);
            })
            .catch((error) => {
                res.status(error.status)
                    .json({
                        error: error.message
                    });
            })
    }
});

router.post('/', (req, res) => {
    payload.create(req.body)
        .then((payload) => {
            res.json(payload);
        })
        .catch((error) => {
            res.status(500)
                .json({
                    error: error
                });
        })
})

router.delete('/', (req, res) => {
    const payload_id = req.query.payload_id;

    payload.deleteOne(payload_id)
        .then((payload) => {
            res.json(payload);
        })
        .catch((error) => {
            res.status(error.status)
                .json({
                    error: error.message
                });
        })
})

router.put('/', (req, res) => {
    const payload_id = req.query.payload_id;

    payload.updateOne(payload_id, req.body)
        .then((payload) => {
            res.json(payload);
        })
        .catch((error) => {
            res.status(500)
                .json({
                    error: error
                });
        })
})

module.exports = router;
