const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

console.log(__dirname);
const filePath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set-up handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set-up static directory to serve 
app.use(express.static(filePath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhist'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Abhist'
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help page',
        name: 'Abhist'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You mush provide an address !'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error: error
            });
        }
        
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if(forecastError) {
                res.send({
                    error: forecastError
                });
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhist',
        errorMessage: 'Help article not found'
    });
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhist',
        errorMessage: 'Page not found'
    });    
});

app.listen(3000, () => {
    console.log('Server is up on localhost: 3000');
});