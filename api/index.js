const express = require("express");
let router = express.Router();

let Routers = {};



router.post("/", (req, res) => {
    res.send("Hello World From API")
});







module.exports = router;