const request = require('request')
//const require = require('require')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=2eeea4d7ba81eaf1d81c991f6a4a7fe8&query='+latitude+','+longitude+'&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Error', undefined)
        } else if (body.error){
            callback('Error two', undefined)
        } else {
            const temp = body.current.temperature
            const feelsLike = body.current.feelslike
            callback(undefined, 'It is currently ' + temp + ' degrees out. It feels like ' + feelsLike + ' degrees out.')
        }

    })
}

module.exports = {
    forecast: forecast
}