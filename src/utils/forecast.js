const request = require("postman-request")


const forecast = (Latitude, Longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=fbdf0094b804fb4d1e3855bf07a3b8f9&query=" + Latitude + "," + Longitude + "&units=m"
    request({ url, json: true }, (error, { body }) => {

    if (error) {
        callback("Unable to connect to weather service")
    } else if (body.error) {
        callback("Unable to find location")
    } else {
        const {temperature, feelslike, weather_descriptions} = body.current
        // const temp = response.body.current.temperature
        // const feel = response.body.current.feelslike
        // const description = response.body.current.weather_descriptions[0]

        callback(undefined, weather_descriptions + ". It is currently " + temperature + " but it feels like " + feelslike)
    } 
})

}

module.exports = forecast
