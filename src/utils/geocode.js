const request = require('request');

const geocode = (locationName, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ locationName +'.json?access_token=pk.eyJ1IjoiZHVyZ2FhYmhpc3QyMDI5NyIsImEiOiJja21jd2R1OWQxbGpsMnBwaHM4bWp2MmdoIn0.1NXG4uKw7OFpFjX4ErIwQg&limit=1';

    request({url: geocodeURL, json: true}, (errors, response) => {
        if(errors) {
            callback('Mapbox is currently not available !', undefined)
        } else if (response.body.features.length < 1) {
            callback('Unable to find location. Try with another location.', undefined);
        } else {
            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;