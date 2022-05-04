const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express cofig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App Dynamics',
        name: 'Andrew Mead',
        footer: 'Footer: '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Welcome to the help page',
        topicOne: 'AAAA',
        topicTwo: 'BBBB',
        name: 'Andrew Mead',
        footer: 'Footer: '
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the teacher',
        name: 'Andrew Mead',
        footer: 'Footer: '
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            console.log(data.location)
            console.log(forecastData)
        })

    })



})

res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia',
    address: req.query.address
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send('You must provide another search')
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//app.com
//app.com/help
//app.com/about


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is on up on port 300')
})