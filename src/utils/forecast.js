const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1b16ecfffcaa3f432a9202c919f03f5b&query='+latitude+','+longitude;

    request({url: url, json: true}, (errors, response) => {
        if (errors) {
            callback('Weather stack is currently unavailable !', undefined);
        } else if (response.body.error) {
            callback(response.body.error.info, undefined);
        } else {
            console.log(response.body.current);
            callback(undefined, 'The current temperature is '+response.body.current.temperature+' but feels like '+response.body.current.feelslike);
        }
    });
};

module.exports = forecast;