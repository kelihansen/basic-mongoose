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
            windingRequired: true
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
            windingRequired: false
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

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    const getFields = ({ _id, name, brand }) => ({ _id, name, brand });

    it('gets all yarns, returning a subset of fields (GET)', () => {
        return Yarn.create(kouki).then(roundTrip)
            .then(saved => {
                kouki = saved;
                return request.get('/yarns');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [nirvana, kouki].map(getFields));
            });
    });

    it('gets a yarn by id (GET)', () => {
        return request.get(`/yarns/${nirvana._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, nirvana);
            });
    });

    it('updates a yarn (PUT)', () => {
        nirvana.fibers = ['merino wool', 'cashmere'];

        return request.put(`/yarns/${nirvana._id}`)
            .send(nirvana)
            .then(({ body }) => {
                assert.deepEqual(body, nirvana);
                return Yarn.findById(nirvana._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, nirvana);
            });
    });

    it('queries yarns (GET)', () => {
        return request.get('/yarns?fibers=cashmere')
            .then(({ body }) => {
                assert.deepEqual(body, [nirvana].map(getFields));
            });
    });

    it('deletes a yarn (DELETE)', () => {
        return request.delete(`/yarns/${kouki._id}`)
            .then(() => {
                return Yarn.findById(kouki._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('returns a 404 if id not found (GET)', () => {
        return request.get(`/yarns/${kouki._id}`)
            .then(response => {
                assert.strictEqual(response.status, 404);
            });
    });
});