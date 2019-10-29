const MongoDB = require('../Database/Connections')
const express = require('express');
const cors = require('cors');
const RotasUsers = require('../Routes/Routes')
const RotasSpots = require('../Routes/RotasSpot')
const RotasSpotUsers = require('../Routes/RotasSpotUsers');
const RorasBookings = require('../Routes/RotasBooking');
const UsersControllers = require('../Controllers/UsersControllers');
const SpotsControllers = require('../Controllers/SpotControllers');
const ProfileControllers = require('../Controllers/ProfileControllers')
const BookingControllers = require('../Controllers/BookingControllers');
const mongo = new MongoDB();
const bodyparse = require('body-parser');



const Setup = async () => {

    const db = await mongo.getconexão();
    const UserControllers = new UsersControllers(db);
    const SpotControllers = new SpotsControllers(db);
    const ProfilesControllers = new ProfileControllers(db);
    const BookingController = new BookingControllers(db);


    const app = express();
    const rotass = RotasUsers.configuracao(UserControllers);
    const rotas = RotasSpots.configuracao(SpotControllers);
    const rotasss = RotasSpotUsers.configuracao(ProfilesControllers);
    const rotassss = RorasBookings.configuracao(BookingController);
   
    app.use(cors());
    app.use(bodyparse.json());
    app.use(bodyparse.urlencoded({ extended: false }));


    app.use('/api', rotass);
    app.use('/api', rotas);
    app.use('/api', rotasss);
    app.use('/api', rotassss);



    return app



}
 module.exports = Setup;