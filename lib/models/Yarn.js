const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: RequiredString,
    brand: RequiredString,
    weight: {
        type: String,
        enum: ['cobweb', 'lace', 'fingering', 'sport', 'dk', 'worsted', 'aran', 'chunky', 'bulky', 'superbulky', 'jumbo']
    },
    yards: {
        type: Number,
        min: 1
    },
    grams: {
        type: Number,
        min: 1
    },
    fibers: [String],
    attributes: {
        machineWashable: Boolean,
        windingRequired: Boolean
    }
});

module.exports = mongoose.model('Yarn', schema);