const ObjectID = require('mongodb').ObjectID;


class ProfileControllers {

    constructor(db) {
        this._db = db
    }






    listarSpotUsers = (req, res) => {

        try {
            const { user_id } = req.body;
            this._db.collection('Spot').find({ user_id: ObjectID(user_id) })
                .toArray((error, cadastro) => {
                    if (error) return next(error);
                    res.send(cadastro);
                })


        } catch (error) {

            res.send(error.toString())

        }



    }








}
module.exports = ProfileControllers;