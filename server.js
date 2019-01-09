//Leo Fist RESTful API + NodeJS project
//Created at 01/05/19

//Import HTTP modules
const http = require('http');

//Import Self created App.JS modules
const app = require('./app');

//Set the Port number
const port = process.env.PORT || 8080;

//Create Server
const server = http.createServer(app);

//Server Listen on specific port
server.listen(port);