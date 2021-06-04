const config = require("../config");

const mongodb = require('mongodb');

module.exports = class MongoDbClientUtil {

    constructor(options) {
        this._options = this._filterOptions(options);
        this.MongoClient = new mongodb.MongoClient(this.connectionURI,
            { useUnifiedTopology: true },
            { useNewUrlParser: true }
        )
    }

    dropCollection(dbName, collectionName) {
        return new Promise(async resolve => {
            if (dbName == undefined || collectionName == undefined) {
                throw new Error("Invalid Arguments Provided");
            }

            await this.connect(dbName, ({ db, err }) => {
                if (err) resolve({ err });

                let coll = db.collection(collectionName)

                coll.drop((err, ok) => {
                    if (err) resolve({ err });
                    resolve({ err, ok });
                })
            })
        })
    }

    update(dbName, collectionName, find = {}, updated = {}) {
        return new Promise(async resolve => {
            if (dbName == undefined || collectionName == undefined) {
                throw new Error("Invalid Arguments Provided");
            }

            await this.connect(dbName, ({ db, err }) => {
                if (err) resolve({ err });

                let coll = db.collection(collectionName)

                coll.updateOne(find, updated, (err, obj) => {
                    if (err) resolve({ err });
                    resolve({ err, obj });
                })
            })
        })
    }

    delete(dbName, collectionName, find = {}) {
        return new Promise(async resolve => {
            if (dbName == undefined || collectionName == undefined) {
                throw new Error("Invalid Arguments Provided");
            }

            await this.connect(dbName, ({ db, err }) => {
                if (err) resolve({ err });

                let coll = db.collection(collectionName)

                coll.deleteOne(find, (err, obj) => {
                    if (err) resolve({ err });
                    resolve({ err, obj });
                })
            })
        })
    }

    get(dbName, collectionName, find) {
        return new Promise(async resolve => {

            if (dbName == undefined || collectionName == undefined) {
                throw new Error("Invalid Arguments Provided");
            }

            await this.connect(dbName, ({ db, err }) => {
                if (err) resolve({ err });

                let coll = db.collection(collectionName)

                coll.find(find).toArray(function (err, docs) {
                    resolve({ err, docs });
                });

            })
        })
    }

    insert(dbName, collectionName, data = {}) {
        return new Promise(async resolve => {

            if (dbName == undefined || collectionName == undefined) {
                throw new Error("Invalid Arguments Provided");
            }

            await this.connect(dbName, ({ db, err }) => {
                if (err) resolve({ err });

                let coll = db.collection(collectionName)

                coll.insertOne(data, (err, result) => {
                    resolve({ err, result })
                    return;
                })

            })
        })
    }

    connect(dbName, callBack = null, mongoUrl = this.connectionURI) {
        return new Promise(async resolve => {

            if (dbName == undefined) {
                throw new Error("DbName Must be Provided");
            }

            this.MongoClient = new mongodb.MongoClient(mongo.mongoUrl,
                { useUnifiedTopology: true },
                { useNewUrlParser: true }
            )

            this.MongoClient.connect((err) => {

                let db = MongoClient.db(dbName);

                if (typeof callBack == "function") {
                    callBack({ db, err })
                }

                resolve({ db, err })
            })
        })
    }

    set conectionURI(uri) {
        this._options.connectionURI = uri;
    }

    get connectionURI() {
        return this._options.connectionURI;
    }

    _filterOptions(o = {}) {

        if (o == undefined || o == null || typeof o != "object") {
            o = {};
        }

        if (o.connectionURI == undefined) {
            o.connectionURI = config.mongoDb.connectionURI;
        }

        return o;
    }

}