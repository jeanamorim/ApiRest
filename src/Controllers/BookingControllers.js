const ObjectID = require('mongodb').ObjectID;

class BookingControllers {

    constructor(db) {
        this._db = db
    }

    criarReserva = async (req, res) => {
        try {

            const { spot_id } = req.params;
            const { user_id } = req.headers;
            const { date } = req.body;

          await this._db.collection('Reservas').insert({user_id:ObjectID(user_id), spot_id:ObjectID(spot_id), date }, (error, results) => {
                if (error) return next(error)
                res.send(results)
            })

        } catch (error) {

            res.send(error.toString())

        }
    }


}

module.exports = BookingControllers;