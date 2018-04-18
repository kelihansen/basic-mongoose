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

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected validation errors');
        return validation.errors;
    };

    it('has required fields', () => {
        const yarn = new Yarn({});
        const errors = getValidationErrors(yarn.validateSync());
        assert.equal(Object.keys(errors).length, 2);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.brand.kind, 'required');
    });
});