const router = require('express').Router();
const Yarn = require('../models/Yarn');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Yarn.create(req.body)
            .then(yarn => res.json(yarn))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        Yarn.find()
            .lean()
            .select('name brand')
            .then(yarns => res.json(yarns))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        Yarn.findById(req.params.id)
            .lean()
            .then(yarn => res.json(yarn))
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        Yarn.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(yarn => res.json(yarn))
            .catch(err => errorHandler(err, req, res));
    });