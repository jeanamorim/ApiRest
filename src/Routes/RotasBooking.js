const exprees = require('express');


class Rotas {

    static configuracao(BookingControllers) {
        const route = exprees.Router();



        route.post('/spot/:id_spot/booking', BookingControllers.criarReserva);
        return route;


    }
}
module.exports = Rotas;