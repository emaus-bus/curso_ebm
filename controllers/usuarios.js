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


const bcryptjs = require("bcryptjs");//

const usuariosGet = async(req = request, res = response) => {
    //end point - controlaodor q hace una consulta a la BD
    
    let {limite = 5, desde = 0} = req.query;// valores por defecto
    desde = parseInt(desde);
    limite = parseInt(limite);
    //console.log({desde, limite});

    if(!Number.isInteger(limite) || !Number.isInteger(desde)){
        res.status(400).json({msg: "No se puede realizar esta consulta"});
        return;
    }

    let conn; //variable

    try {
        conn = await pool.getConnection();
        
        const usuarios = await conn.query(usuariosQueries.selectUsuarios,[
            desde,//
            limite,]
             );//
        res.json({usuarios});
        //limite y cuantos
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
        //
        const salt = bcryptjs.genSaltSync();//
        const passwordHash = bcryptjs.hashSync(password,salt);/////////////////////////////////////////////7
        
        conn = await pool.getConnection();
        const usuarios = await conn.query(usuariosQueries.insertUsuario,[
            nombre,
            email,
            passwordHash,
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

//
const usuariosSignin = async(req = request, res = response) => {
    const { email, password } = req.body;
    let conn;

    try {
        conn = await pool. getConnection();

        const usuarios = await conn.query(usuariosQueries.getUsuarioByEmail, [email]);

        if (usuarios.length === 0){
            res.status(404).json({msg:`No se encontró el usuario ${email}.`});
            return;
        }
        //revisamos que la contraseña coincide               //hash
        const passwordValido = bcryptjs.compareSync(password, usuarios[0].password);
        console.log(usuarios[0].password);

        if (!passwordValido){               //no ser tan explicitos en cual es el error
            res.status(401).json({msg : "La contraseña no coincide." });
            return;
        }

        res.json({msg : "Inicio de sesión satisfactorio."});  ///
    }catch (error){
        console.log(error);
        res.status(500),json({msg:"Por favor contacte al administrador.",error});
    } finally {
        if (conn) conn.end();
    }
};
//



const usuariosPut = async(req = request, res = response) => {
    const { email } = req.query;
    const { nombre, status} = req.body;
    
    let conn;

    try {
        conn = await pool.getConnection();

        const usuarios = await conn.query(usuariosQueries.updateUsuario, [nombre, status, email]);
        
        res.json({usuarios});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Por favor contacte al administrador", error});
    } finally {
        if (conn) conn.end();
    }
};

const usuariosDelete = async(req = request, res = response) => {
    const { email } = req.query;

    let conn;

    try {
        conn = await pool.getConnection();
        const usuarios = await conn.query(usuariosQueries.deleteUsuario,[email,]);
        res.json({usuarios});
    }catch (error) {
        console.log(error);
        res.status(500).json({msg : "Por favor contacte al Administrador.", error });
    } finally {
        if (conn) conn.end();
    }
    
};
//Tarea: Hacer un Ednpint para actualizar la contraseña
//Hacer la consulta 
//contraseña actual y contraseña nueva


const usuariosValidation = async(req = request, res = response) => {
    const { email, password } = req.body;
    //const { password } = re.query;
    let { newpass } = req.query;
    let conn;

    try {
        conn = await pool. getConnection();

        const usuarios = await conn.query(usuariosQueries.validaUsuario, [email,]);

        if (usuarios.length === 0){
            res.status(404).json({msg:`El usuario o la contraseña no coinciden ${email}.`});
            return;
        }
        
        //revisamos que la contraseña coincide               //hash
        const passwordValido = bcryptjs.compareSync(password, usuarios[0].password);
        console.log(`${usuarios[0].password}  ok - si coincide`);// ok - si coincide
        //res.status(201).json({msg:"coincide el password"});

        if (!passwordValido){               //no ser tan explicitos en cual es el error
            res.status(401).json({msg : "`El usuario o la contraseña no coinciden." });
            return;
        }
        //ciframos
        const salt = bcryptjs.genSaltSync();//
        const passwordHash = bcryptjs.hashSync(newpass,salt);/////////////////////////////////////////////7
        //registramos la nueva contraseña
        const usuarios2 = await conn.query(usuariosQueries.updatePass, [passwordHash, email]);
        
        res.json({msg : "Contraseña actualizada.  [ [ [ E. Mora 2021 ] ] ] "});
        /////////console.log(usuarios2[0].newpass);//  coincide?
        console.log("Gracias...");//  coincide?
        if (conn) conn.end();
        return;
    }catch (error){
        console.log(error);
        res.status(500),json({msg:"Por favor contacte al administrador.",error});
    } finally {
        if (conn) conn.end();
    }
};
//


module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosSignin, usuariosValidation,};
