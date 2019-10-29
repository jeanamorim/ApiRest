const db = require('../Setup/Setup')
const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const UsersControllers = require('./UsersControllers')


class SpotControllers {

    constructor(db) {
        this._db = db
    }

    cadastrarSpots = async (req, res) => {

        try {

            //const { filename } = req.file;
            const { company, techs, price } = req.body;
            const { user_id } = req.headers;

            const result = await this._db.collection('Spot').insertOne({
                user_id: ObjectID(user_id), company,
                techs: techs.split(',').map(tech => tech.trim()), price
            })

            const resul = await this._db.collection("Spot").aggregate([
                {
                    $match: { _id: result.insertedId }

                },
                {
                    $lookup:
                    {
                        from: "Usuarios", //nome da tabela que quer fazer o match
                        localField: "user_id",//usuario local que vai receber o id
                        foreignField: "_id", //a forma que o banco salva o id
                        as: "Usuario" //o nome que voce quer que imprima 
                    }
                }
            ]).toArray()
            res.send(resul)
            // }
            // res.status(400).send({ Error: "Todos os dados devem ser preenchido" })



        } catch (error) {

            res.send(error.toString())
        }

    }
    cadastrarSpot = async (req, res) => {
        try {

            const { company, techs, price } = req.body;
            const { user_id } = req.headers;

            await this._db.collection('Spot')
                .insertOne({ user_id: ObjectID(user_id), company, techs: techs.split(',').map(tech => tech.trim()), price })
                .then(x => {
                    res.status(201).send({ message: 'Spot cadastrado com sucesso!' })
                })
        } catch (error) {
            res.status(400).send({ error: 'Erro ao cadastrar' })

        }

    }




    listarSpot = (req, res) => {

        try {


            const { tech } = req.query;
            this._db.collection('Spot').find({ techs: tech })
                .toArray((error, cadastro) => {
                    if (error) return next(error);
                    res.send(cadastro);
                })


        } catch (error) {

            res.send(error.toString())

        }



    }


}



module.exports = SpotControllers;

