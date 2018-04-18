const { assert } = require('chai');
const request = require('./request');
const Yarn = require('../../lib/models/Yarn');
const { dropCollection } = require('./db');

describe('Yarn API', () => {
    before(() => dropCollection('yarns'));

    let nirvana = {
        name: 'Nirvana',
        brand: 'Sunday Knits',
        weight: 'sport',
        yards: 246,
        grams: 50,
        fibers: ['merino', 'cashmere'],
        attributes: {
            machineWashable: false,
            windingRequired: true,
        }
    };

    let kouki = {
        name: 'Kouki',
        brand: 'Ito',
        weight: 'fingering',
        yards: 295,
        grams: 50,
        fibers: ['ramie', 'silk'],
        attributes: {
            machineWashable: false,
            windingRequired: false,
        }
    };

    it('saves a yarn (POST)', () => {
        return request.post('/yarns')
            .send(nirvana)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.strictEqual(__v, 0);
                assert.deepEqual(body, { _id, __v, ...nirvana });
                nirvana = body;
            });
    });
});