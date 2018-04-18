const express = require('express');
const app = express();
const yarns = require('./routes/yarns');

app.use(express.json());

app.use('/yarns', yarns);

module.exports = app;