const express = require('express');
const router = express.Router();

const attack = require("./subRoutes/attack")
// const device = require("./subRoutes/device")
const healthCheck = require("./subRoutes/healthCheckl");
const payload = require("./subRoutes/payload");

router.use("/attack", attack);
// router.use("/device", device);
router.use("/health_check", healthCheck);
router.use("/payload", payload);

router.route("*")
    .get((req, res) => {
        console.log("GET - Fall back");

        res.status(404)
            .json({message: "Route Not Found"});
    })
    .post((req, res) => {
        console.log("POST - Fall back");

        res.status(404)
            .json({message: "Route Not Found"});
    })
    .delete((req, res) => {
        console.log("DELETE - Fall back");

        res.status(404)
            .json({message: "Route Not Found"});
    })
    .put((req, res) => {
        console.log("PUT - Fall back");

        res.status(404)
            .json({message: "Route Not Found"});
    })

module.exports = router;
