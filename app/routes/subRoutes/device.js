const express = require('express');
const router = express.Router();

// TODO

router.get('/', function (req, res, next) {
    res.json({message: "It working..."});
});

module.exports = router;
