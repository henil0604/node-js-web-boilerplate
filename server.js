let STARTING_TIME = Date.now();

// Loading Modules and Packages
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
let config = require("./config");
const logger = require("./modules/logger");
const MongoDbClientUtil = require("./modules/MongoDbClientUtil");
const ToolBox = require("./modules/ToolBox");

// Settings Routers Requirements
let Routers = {
    pages: require("./pages"),
    api: require("./api")
};

// Enabling CORS for Every Request (Can be Changed at Router)
app.use(cors());

// Setting boyd-parser and cookie-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Setting View Engine
app.set("view engine", "ejs");

// Setting Middleware for Every Request
app.use((req, res, next) => {
    // Logging Hit Request
    logger(`${req.method} ${req.originalUrl}`, 'info', '[HIT]')

    // Loading Config
    config = require("./config");
    // Setting Config into req Object
    req.config = config;

    // Setting Other Utilities
    req.ToolBox = new ToolBox();
    req.MongoDbClientUtil = new MongoDbClientUtil();

    next();
});

// Serving Assets
app.use("/assets", express.static("./assets"));


// Setting Routers
app.use(Routers.pages);
app.use(Routers.api);


// Starting to Listen
app.listen(config.server.PORT, () => {
    // Calculating the Time For Loading
    let STARTED_TIME = Date.now();
    let TOTAL_LOAD_TIME = STARTED_TIME - STARTING_TIME;

    // Loggin Information
    logger(`Running on ${config.server.HOST}:${config.server.PORT}`, "success", "[SERVER]")
    logger(`Total Load Time: ${TOTAL_LOAD_TIME}ms`, "success", "[SERVER]")
});