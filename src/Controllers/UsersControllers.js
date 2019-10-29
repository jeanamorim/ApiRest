//@flow
import express, { type $Application, type $Request, type $Response, Router, } from 'express';
import mongodb, { type $db, } from 'mongodb';

const db = require('../Setup/Setup');
const ObjectID = require('mongodb').ObjectID;
const ValidationContract = require('../validators/validator');





class UsersControllers {
    _db: db

    constructor(db: db) {
        this._db = db
    }


    cadastrarUser = async (req: $Request, res: $Response) => {
        try {

            const { email } = req.body;

            if (await this._db.collection('Usuarios').findOne({ email }))
                return res.status(400).send({ error: 'Usuario ja existe na nossa base de dados' });

            const result = await this._db.collection('Usuarios').insert({ email })

            res.status(201).send({ result })

        } catch (error) {
            res.status(400).send({ error: 'Register falied' })

        }
    }

    authenticate = async (req: $Request, res: $Response) => {


        try {
            const { email, password } = req.body;
            const { user_id } = req.params;

            const user = await this._db.collection('Usuarios').findOne({ email })
            const Password = await this._db.collection('Usuarios').findOne({ password })


            if (!user)
                return res.status(400).send({ error: 'Usuario não existe' });
            if (!Password)
                return res.status(400).send({ error: 'Invalid password' });


            res.send(user)


        } catch (error) {
            res.send(error.toString())

        }



    }

    listarUser = async (req: $Request, res: $Response) => {

        try {

            const result = await this._db.collection('Usuarios').find({}, { sort: { _id: -1 } })
            res.status(201).send({ result })

        } catch (error) {

            res.send(error.toString())

        }

    }

    buscarIDUser = async (req: $Request, res: $Response) => {

        try {

            const result = await this._db.collection('Usuarios').find({ _id: mongodb.ObjectID(req.params.id) })
            res.status(201).send({ result })

        } catch (error) {
            res.send(error)

        }

    }


    alterarUser = async (req: $Request, res: $Response) => {

        try {

            const result = await this._db.collection('Usuarios').update({ _id: mongodb.ObjectID(req.params.id, req.body) }, { set: req.body })
            res.status(201).send({ result })

        } catch (error) {
            res.sen(error)

        }

    }

    deletarUser = async (req: $Request, res: $Response) => {
        try {

            const result = await this._db.collection('Usuarios').remove({ _id: mongodb.ObjectID(req.params.id) })
            res.status(201).send({ result })
        } catch (error) {

            res.send(error)

        }

    }

}

module.exports = UsersControllers;    