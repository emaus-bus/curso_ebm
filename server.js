const express = require("express");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.port

        this.routes();
    }

    routes(){
        this.app.get("/", function(req, res){
            res.send("Hola Emaus");
        });
    }

    listen(){
        this.app.listen(this.port);
    }
}
module.exports = Server;

