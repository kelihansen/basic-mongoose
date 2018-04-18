const { assert } = require('chai');
const Yarn = require('../../lib/models/Yarn');

describe('Yarn model', () => {
    it('is a valid, good model', () => {
        const info = {
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

        const yarn = new Yarn(info);

        assert.deepEqual(yarn.toJSON(), {
            _id: yarn._id,
            ...info
        });

        assert.isUndefined(yarn.validateSync());
    }); 
});