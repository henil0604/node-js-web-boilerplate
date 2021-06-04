let { v4: uuid } = require("uuid");


module.exports = class ToolBox {

    constructor() { }

    uuid(iteration = 1) {
        let toReturn = "";

        for (let i = 0; i < iteration; i++) {
            toReturn += uuid()
        }

        return toReturn;
    }

}