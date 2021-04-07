const express = require('express');
const router = express.Router();

const attack = require("../../database/models/AttackResult")

router.get('/', (req, res) => {
    const attack_id = req.query.attack_id;

    if (attack_id) {
        attack.readOneById(attack_id)
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
        attack.readAll()
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

router.delete('/', (req, res) => {
    const attack_id = req.query.attack_id;

    attack.deleteOne(attack_id)
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
