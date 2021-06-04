let STARTING_TIME = Date.now();

// Loading Modules and Packages
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let config = require("./config");
const logger = require("./modules/logger");

// Settings Routers Requirements
let Routers = {
    pages: require("./pages"),
    api: require("./api")
};

// Enabling CORS for Every Request (Can be Changed at Router)
app.use(cors())

// Setting boyd-parser and cookie-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Setting View Engine
app.set("view engine", "ejs");

// Setting Middleware for Every Request
app.use((req, res, next) => {
    logger(`${req.method} ${req.originalUrl}`, 'info', '[HIT]')

    config = require("./config");
    req.config = config;
    next();
})

// Serving Assets
app.use("/assets", express.static("./assets"));


app.use(Routers.pages)
app.use(Routers.api)



app.listen(config.server.PORT, () => {
    let STARTED_TIME = Date.now();
    let TOTAL_LOAD_TIME = STARTED_TIME - STARTING_TIME;

    logger(`Running on ${config.server.HOST}:${config.server.PORT}`, "success", "[SERVER]")
    logger(`Total Load Time: ${TOTAL_LOAD_TIME}ms`, "success", "[SERVER]")

})