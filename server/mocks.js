const { Country } = require('./models/country');
const fs = require('fs');

module.exports = async() => {
    let contents = fs.readFileSync('./jsons/countries.readme', 'utf8');
    contents = JSON.parse(contents);
    try {
        await Country.remove({});
        contents.forEach(async(item) => {
            //console.log(item.name, item.code);
            const country = await Country.create({
                name: item.name,
                code: item.code
            });
            //console.log(country);
        });
    } catch (error) {
        console.log(error);
    }

    console.log('after calling readFile');
    console.log('--------------------');
};