const chalk = require('chalk');

let logger = (msg, type, title = undefined) => {

    if (type == "info") {
        console.log(`${chalk.blueBright(title || "[Info]")} ${msg}`);
    } else if (type == "warn") {
        console.log(`${chalk.yellowBright(title || "[Warning]")} ${msg}`)
    } else if (type == "success") {
        console.log(`${chalk.greenBright(title || "[Success]")} ${msg}`)
    } else if (type == "danger") {
        console.log(`${chalk.redBright(title || "[Err]")} ${msg}`)
    }

}

module.exports = logger;