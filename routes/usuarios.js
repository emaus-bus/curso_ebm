/*
const {Router} = require("express");

const router = Router();

//localhost:3001/usuarios/
router.get("/", function (req, res){
    res.json({msg: "Hola a todos compañeros desde - GET - con Router"});
});
router.post("/usuarios", function (req, res){
    res.status(201).json({msg: "Hola a todos desde - POST - con Router"});
});
router.put("/usuarios", function (req, res){
    res.status(400).json({msg: "Hola a todos compañeros desde - PUT - con Router"});
});
router.delete("/usuarios", function (req, res){
    res.status(500).json({msg: "Hola a todos compañeros desde - DELETE - con Router"});
});

module.exports = router;
*/


/*
const {Router} = require("express");

const router = Router();

//localhost:3001/usuarios/
router.get("/", function (req, res){
    res.json({msg: "Hola a todos compañeros desde - GET - con Router"});
});
router.post("/", function (req, res){
    res.status(201).json({msg: "Hola a todos desde - POST - con Router"});
});
router.put("/", function (req, res){
    res.status(400).json({msg: "Hola a todos compañeros desde - PUT - con Router"});
});
router.delete("/", function (req, res){
    res.status(500).json({msg: "Hola a todos compañeros desde - DELETE - con Router"});
});

module.exports = router;
*/


//Pase de pa´rametros dentro de la URL
const {Router} = require("express");

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

//localhost:3001/usuarios/
router.get("/", usuariosGet);

router.post("/", usuariosPost);

router.put("/:id", usuariosPut);  //para pasarle el paraámetro variable

router.delete("/", usuariosDelete);

module.exports = router;
