module.exports = {
    server: {
        PORT: process.env.PORT || 3001,
        HOST: "http://127.0.0.1"
    },
    mongoDb: {
        connectionURI: "mongodb://localhost:27017"
    }
};