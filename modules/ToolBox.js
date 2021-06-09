let crypto = require("crypto");
let { v4: uuid } = require("uuid");


module.exports = class ToolBox {

    constructor() { }


    looper(callback, count, array = null) {
        loop:
        for (let index = 0; index < count; index++) {
            let toReturn;

            if (array != null) {
                toReturn = callback(index, array[index])
            } else {
                toReturn = callback(index)
            }

            if (toReturn instanceof Promise) {
                toReturn = undefined;
            }

            if (toReturn != undefined) {
                return toReturn;
            }
        }
    }

    randomBytes(n) {
        return crypto.randomBytes(n).toString("hex");
    }

    delayer(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms);
        })
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbToHex(r, g, b) {
        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    isNumber(str) {
        let numbers = "0123456789"
        if (numbers.indexOf(str) == -1) {
            return false;
        }
        return true;
    }

    isString(str) {
        let strings = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (strings.indexOf(str) == -1) {
            return false;
        }
        return true;
    }

    jsNameToCssName(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
    }

    uuid(iteration = 1) {
        let toReturn = "";

        for (let i = 0; i < iteration; i++) {
            toReturn += uuid()
        }

        return toReturn;
    }

}