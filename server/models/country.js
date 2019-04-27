const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    name: {
        require: true,
        type: String,
        unique: 1,
        maxlength: 100
    },
    code: {
        require: true,
        type: String,
        unique: 1,
        maxlength: 100
    }
});

countrySchema.set("toJSON", { virtuals: true });
const Country = mongoose.model('Country', countrySchema);

module.exports = { Country };