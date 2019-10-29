const exprees = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const upload= multer(uploadConfig);




class Rotas{

static configuracao(SpotControllers){
    const route = exprees.Router();
   

    route.post('/cadastrarSpot',upload.single('imagem'), SpotControllers.cadastrarSpot);
    route.get('/listarSpot', SpotControllers.listarSpot);
    return route;






}




}
module.exports = Rotas;