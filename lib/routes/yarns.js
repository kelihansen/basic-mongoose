const router = require('express').Router();
const Yarn = require('../models/Yarn');

module.exports = router
    .get('/', (req, res) => {
        console.log('request heard!');
    });