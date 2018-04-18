require('dotenv').config({ path: './test/e2e/.env' });
const mongoose = require('mongoose');
const connect = require('../../lib/connect');

before(() => connect(process.env.MONGODB_URI));
after(() => mongoose.connection.close());

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName != 'NamespaceNotFound') throw err;
            });
    }
};