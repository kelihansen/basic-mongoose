const router = require('express').Router();
const Yarn = require('../models/Yarn');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Yarn.create(req.body)
            .then(yarn => res.json(yarn))
            .catch(err => errorHandler(err, req, res));
    });