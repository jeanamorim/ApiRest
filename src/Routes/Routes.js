const exprees = require('express');


class Rotas{

static configuracao(UsersControllers){
    const route = exprees.Router();

    route.post('/cadastrarUser', UsersControllers.cadastrarUser);
    route.post('/authenticate', UsersControllers.authenticate);
    route.get('/listarUser', UsersControllers.listarUser);
    route.get('/buscarIDUser/:id', UsersControllers.buscarIDUser);
    route.put('/alterarUser/:id', UsersControllers.alterarUser);
    route.delete('/deletarUser/:id', UsersControllers.deletarUser);
    return route;



    


}




}
module.exports = Rotas;

