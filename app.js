/*console.log("Hola Emaús Bus!");
*/


/*
const express = require("express");
const app = express();
app.get("/", function (req, res) {res.send("Hola Emaús"); });
app.listen(3000); //en q puerto escucha mi Api
*/
//localhost:3000

/*
const express = require("express");
//const dotenv = require("dotenv").config();
require("dotenv").config();

const app = express();
app.get("/", function (req, res) {
    res.send("Hola Emaus Bus");
 });
app.listen(process.env.PORT); //en q puerto escucha mi Api
*/


require("dotenv").config();
const Server = require("./server")
const server = new Server;
server.listen();