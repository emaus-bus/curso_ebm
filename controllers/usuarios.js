/*
const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
    res.json({msg : "Hola a todos desde - GET - con express EBM"})
};

const usuariosPost = (req = request, res = response) => {
    const { nombre, apellido, email, edad = 0} = req.body;
    res.status(201).json({msg : "Hola a todos desde - POST - con express", nombre, apellido, email, edad });
};

const usuariosPut = (req = request, res = response) => {
    const { id } = req.params;
    res.status(400).json({msg :  "Hola a todos desde - PUT - con express", id });
};

const usuariosDelete = (req = request, res = response) => {
    const { usuario, password } = req.query;
    res.status(500).json({msg : "Hola a todos desde - DELETE - con express", usuario , password });
};

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete};
*/




/*
const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
    res.json({msg : "Hola a todos desde - GET - con express EBM"})
};

const usuariosPost = (req = request, res = response) => {
    const { nombre, apellido, email, edad = 0} = req.body;
    res.status(201).json({msg : "Hola a todos desde - POST - con express", nombre, apellido, email, edad });
};

const usuariosPut = (req = request, res = response) => {
    const { id } = req.params;
    res.status(400).json({msg :  "Hola a todos desde - PUT - con express", id });
    
    //const data  = req.params;
    //res.status(400).json({msg :  "Hola a todos desde - PUT - con express", data });
    
};

const usuariosDelete = (req = request, res = response) => {
    const { usuario, password } = req.query;
    res.status(500).json({msg : "Hola a todos desde - DELETE - con express", usuario , password });
};

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete};
*/



//Trabajar de forma asíncrona
const { request, response } = require("express");
const pool = require("../db/conexion");
const usuariosQueries = require("../models/usuarios");
//const usuariosQueries = require("../models/usuarios");///////-ok

const usuariosGet = async(req = request, res = response) => {
    //end point - controlaodor q hace una consulta a la BD
    let conn; //variable
    try {
        conn = await pool.getConnection();
        ///////////////-ok
        const usuarios = await conn.query(usuariosQueries.selectUsuarios);
        res.json({usuarios});

    }catch (error){
        console.log(error);
        res.status(500).json({msg: "Por favor contacte al admin.",error});

    }finally{   //se ejecuta independientemente si tiene exito el try
        if (conn) conn.end();
    }

};

const usuariosPost = async(req = request, res = response) => {
    const { nombre, email, password, status = 1} = req.body;
    let conn;

    try{
        conn = await pool.getConnection();
        const usuarios = await conn.query(usuariosQueries.insertUsuario,[
            nombre,
            email,
            password,
            status,
        ]);
        res.json({usuarios});
    } catch(error){
        console.log(error);
        res.status(500).json({msg : "Por favor contacte al administrador", error});
    }finally{
        if (conn) conn.end();
    }
    };

const usuariosPut = (req = request, res = response) => {
    const { id } = req.params;
    res.status(400).json({msg :  "Hola a todos desde - PUT - con express", id });
    
};

const usuariosDelete = (req = request, res = response) => {
    const { usuario, password } = req.query;
    res.status(500).json({msg : "Hola a todos desde - DELETE - con express", usuario , password });
};

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete};