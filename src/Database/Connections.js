const mongo = require('mongodb');

class MongoDB {
    _db

    constructor() {

        this.conectar();
    }

    async getconexão() {
        if (this._db) {
            return this._db
        }
        return await this.conectar()

    }


    async conectar() {

        const mongoCliente = await mongo.connect('mongodb+srv://jeanamorim:jeanamorim@cluster0-dxa6t.mongodb.net/APImongo?retryWrites=true&w=majority',
        { useNewUrlParser: true ,  useUnifiedTopology: true});
        const db = mongoCliente.db('APImongo');
        return db;


    }

}

module.exports = MongoDB;