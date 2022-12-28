/* Cuando se quiera Inicializar los Datos correr este js con Node*/
import ClientSQL from "./config/initDB.js";
import { options } from "./config/configDB.js";

const sql = new ClientSQL(options.sqlite);

try {
    await sql.crearTablaMensajes()   
    console.log("Tabla Mensajes creada con exito");   
} catch (error){
    console.log(error);    
} finally {
    sql.close();
}