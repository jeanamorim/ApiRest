const exprees = require('express');


class Rotas{

static configuracao(ProfileControllers){
    const route = exprees.Router();
   

    
    route.get('/listarSpotUsers', ProfileControllers.listarSpotUsers);
    return route;






}




}
module.exports = Rotas;