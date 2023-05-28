import { database } from "./keys.js";
import mysql from "mysql2";
import { promisify } from "util";

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("LA CONEXIÓN DE LA BASE DE DATOS ESTABA CERRADA");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.log("LA BASE DE DATOS TIENE MUCHAS CONEXIONES");
    }
    if (err.code === "ECONNREFUSED") {
      console.log("LA CONEXIÓN DE LA BASE DE DATOS FUE RECHAZADA");
    }
  }
  if (connection) {
    connection.release();
    console.log("BD conectada");
  }
});

pool.query = promisify(pool.query);

export default pool;
