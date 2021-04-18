const express = require('express');
const router = express.Router();

const attack = require("../../database/models/Attack");
const httpStatusCode = require('../../constants/httpStatusCode');

// TODO: Ask to ZappaBoy
function errorResponse(res, error) {
    return res.status(error.status)
        .json({
            error: error.message
        });
}

router.get('/', async (req, res) => {
    const attack_id = req.query.attack_id;

    if (attack_id) {
        await attack.getById(attack_id)
            .then((attackData) => {
                if (attackData) {
                    res.status(httpStatusCode.OK)
                        .json(attackData);
                } else {
                    res.status(httpStatusCode.NOT_FOUND)
                        .json({
                            error: 'Payload not found'
                        });
                }
            })
            .catch((error) => {
                errorResponse(res, error);
            })
    } else {
        await attack.getAll()
            .then((attackData) => {
                res.status(httpStatusCode.OK)
                    .json(attackData);
            })
            .catch((error) => {
                errorResponse(res, error);
            })
    }
});

router.delete('/', async (req, res) => {
    const attack_id = req.query.attack_id;

    await attack.remove(attack_id)
        .then((attackData) => {
            res.status(httpStatusCode.OK)
                .json(attackData);
        })
        .catch((error) => {
            errorResponse(res, error);
        })
})

module.exports = router;
