const got = require('got');

async function getData () {
    try {
        const URL = 'https://reqres.in/api/users';
        const response = await got(URL);
        const data = JSON.parse(response.body);
        console.log(data.data);
        
        return data.data;

    } catch (error) {
        console.log(error.data);
    }
};

getData();

module.exports = getData;