/*  Respuestas de la API en "texto plano"
const express = require("express");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.routes();
    }

    routes(){
        this.app.get("/", function(req, res){
            res.send("Hola Emaús desde GET");
        });
        this.app.post("/", function(req, res){
            res.send("Hola Emaús desde POST");
        });
        this.app.put("/", function(req, res){
            res.send("Hola Emaús desde PUT");
        });
        this.app.delete("/", function(req, res){
            res.send("Hola Emaús desde DELETE");
        });
    }

    listen(){
        this.app.listen(this.port);
    }
}
module.exports = Server;
*/

/*
//Respuestas de la API en formato JSON
//    ->códigos de respuesta HTTP
const express = require("express");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.routes();
    }

    routes(){
        this.app.get("/", function(req, res){
            res.json({"msg":"Hola Emaús desde GET - con Json"});
        });
        this.app.post("/", function(req, res){
            res.status(201).json({"msg":"Hola Emaús desde POST - con Json"});
        });
        this.app.put("/", function(req, res){
            res.status(400).json({"msg":"Hola Emaús desde PUT - con Json"});
        });
        this.app.delete("/", function(req, res){
            res.status(500).json({"msg":"Hola Emaús desde DELETE - con Json"});
        });
    }

    listen(){
        this.app.listen(this.port);
    }
}
module.exports = Server;
*/


/*
//Utilizando CORS - registros para usar los verbos:
// GET POST PUSH DELETE
const express = require("express");
        //const rutasUsuarios = require("./routes/usuarios");
const cors = require("cors");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.rutasUsuarios = "/usuarios";

        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(cors());
    }

    routes(){
        this.app.use(this.rutasUsuarios, require("./routes/usuarios"
        ));
    }

    listen(){
        this.app.listen(this.port);
    }
}
module.exports = Server;
*/


const express = require("express");
const cors = require("cors");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.rutasUsuarios = "/usuarios";

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }
    routes(){
        this.app.use(this.rutasUsuarios, require("./routes/usuarios"));
    }

    listen(){
        this.app.listen(this.port);
    }
}
module.exports = Server;

