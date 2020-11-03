const request = require ("postman-request")


const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiaGFydG1hbi1uaWNob2xhcyIsImEiOiJja2gwanY1dW4wNTc0MnJxNWczejZia3V0In0.yz3hoW6pezXK_pFOAu4xEQ&limit=1"
    request({ url, json: true }, (error, {body}) => {
    
        if (error) {
            callback("Unable to connect to the maps services")
        } else if ( body.features.length === 0) {
            callback("Try a new location for the entry")
        } else {
            const {center: latitude, center: longitude, place_name} = body.features[0]

            // const latitude = response.body.features[0].center[1]
            // const longitude = response.body.features[0].center[0]
            // const place = response.body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                place_name,
            })
        }
    })
}

module.exports = geocode