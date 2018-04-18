const { assert } = require('chai');
const request = require('./request');
const Yarn = require('../../lib/models/Yarn');
const { dropCollection } = require('./db');

describe('Yarn API', () => {
    before(() => dropCollection('yarns'));

    it('is hooked up', () => {
        assert.ok(true);
    });
});