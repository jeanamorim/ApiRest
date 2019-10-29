
const http = require('http');
const Setup = require('./Setup/Setup');


Setup()
.then(app => {

const server = http.createServer(app)

server.listen(3500)

});