const path = require ("path")
const express = require("express")
const hbs = require("hbs")


const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()

// Define paths for Express Config

const public = (path.join(__dirname, "../public"))
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(public))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Nicholas Hartman",
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Nicholas Hartman"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        name: "Nicholas Hartman",
        message: "I came here to get help but all I got was sadness",
    })
})


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    const command = req.query.address

    geocode(command, (error, { latitude, longitude, place_name } = {}) => {

    if (error) {
        return res.send(error)
    }
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send(error)
        }
    res.send({
        location: place_name,
        forecast: forecastData,
        address: req.query.address
    })
    })
    })
})




app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "Error 404",
        name: "Nicholas Hartman",
        message: "Help article not found",
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "Error 404",
        name: "Nicholas Hartman",
        message: "Page not found",
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000")
})