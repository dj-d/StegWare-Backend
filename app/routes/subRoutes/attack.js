const express = require('express');
const router = express.Router();

const attack = require("../../database/models/Attack")

router.get('/', async (req, res) => {
    const attack_id = req.query.attack_id;

    if (attack_id) {
        await attack.getById(attack_id)
            .then((attack) => {
                if (attack) {
                    res.json(attack);
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
        await attack.getAll()
            .then((attack) => {
                res.json(attack);
            })
            .catch((error) => {
                res.status(error.status)
                    .json({
                        error: error.message
                    });
            })
    }
});

router.delete('/', async (req, res) => {
    const attack_id = req.query.attack_id;

    await attack.remove(attack_id)
        .then((attack) => {
            res.json(attack);
        })
        .catch((error) => {
            res.status(error.status)
                .json({
                    error: error.message
                });
        })
})

module.exports = router;
