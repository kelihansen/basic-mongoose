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
        Yarn.find(req.query)
            .lean()
            .select('name brand')
            .then(yarns => res.json(yarns))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Yarn.findById(id)
            .lean()
            .then(yarn => {
                if(!yarn) {
                    errorHandler({
                        status: 404,
                        error: `yarn with id "${id}" not found`
                    }, req, res);
                }
                else res.json(yarn);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        Yarn.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
            .then(yarn => res.json(yarn))
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        Yarn.findByIdAndRemove(req.params.id)
            .then(removed => res.json({ removed }))
            .catch(err => errorHandler(err, req, res));
    });