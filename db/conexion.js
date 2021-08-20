const mariadb = require("mariadb");

const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: process.env.CONN_LIMIT,
};
//console.log(config);  //puede omitirse - muestra los datos de configuración


//realiza la conexión
const pool = mariadb.createPool(config);
//exportamos pool;
module.exports = pool;