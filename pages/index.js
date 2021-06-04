const express = require("express");
let router = express.Router();

let views = {
    index: "index"
};






router.get("/", (req, res) => {
    res.render(views.index);
})








module.exports = router;