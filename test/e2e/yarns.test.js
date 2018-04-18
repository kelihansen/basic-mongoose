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

    it('saves and gets a yarn', () => {
        return new Yarn(nirvana).save()
            .then(saved => {
                saved = saved.toJSON();
                const { _id, __v } = saved;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(saved, { _id, __v, ...nirvana });
                nirvana = saved;
                return Yarn.findById(saved._id).lean();
            })
            .then(found => {
                assert.deepEqual(found, nirvana);
            });
    });
});