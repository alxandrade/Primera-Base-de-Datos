/* Cuando se quiera Inicializar los Datos correr este js con Node*/

import ClientSQL from "./config/initDB.js";
import { options } from "./config/configDB.js";


const sql = new ClientSQL(options.mysql);

sql
    .crearTablaProductos()
    .then(() => {
        console.log("Tabla de Productos Creada con Éxito");
        //Cargar Productos a la tabla
        const productos = [
            {"codigo":"Escuadra","descripcion":"Escuadra escolar mediana","precio":123.45,"stock":25,"foto":"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"},
            {"codigo":"Calculadora","descripcion":"Calculadora cientifica","precio":234.56,"stock":35,"foto":"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"},
            {"codigo":"Globo Terráqueo","descripcion":"Globo Terráqueo tamaño grande","precio":345.67,"stock":10,"foto":"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"},
            {"codigo":"Mesa de centro","descripcion":"Mesa de centro grande de madera","precio":"27800","stock":15,"foto":"https://d1r8o43atolcyl.cloudfront.net/683765800988_1.png"},
            {"codigo":"Lámpara","descripcion":"Lámpara de mesa","precio":"859","stock":45,"foto":"https://www.gaiadesign.com.mx/media/catalog/product/cache/28cb47c806b746a91bc25b380c9673fa/l/a/lampara_de_mesa_nite_negro_still1_v2.jpg"},
            {"codigo":"Funda de piel","descripcion":"Funda de piel y resistente al agua para Kindle Oasis, color gris oscuro","precio":"599.99","stock":25,"foto":"https://m.media-amazon.com/images/I/81p1pGMhL3L.__AC_SX300_SY300_QL70_ML2_.jpg"},
            {"codigo":"Auriculares","descripcion":"Auriculares estéreo con cable para juegos para PlayStation","precio":"1400","stock":12,"foto":"https://m.media-amazon.com/images/I/81CCzaO6y3L._AC_UY327_FMwebp_QL65_.jpg"},
            {"codigo":"YETI","descripcion":"Taza YETI para excursionistas, de 10 onzas","precio":"600","stock":65,"foto":"https://m.media-amazon.com/images/I/61Bs1TNIZ6L._AC_SY200_.jpg"},
            {"codigo":"Interuptor inteligente","descripcion":"TP-LINK HS200 Kasa Smart Wi-Fi - Interuptor inteligente","precio":"268.91","stock":25,"foto":"https://m.media-amazon.com/images/I/71nMzhO05jL._AC_SX522_.jpg"},
            {"codigo":"Llantas","descripcion":"2 Llantas 185/60R15\" Sf-688 84H Radial","precio":"2305","stock":42,"foto":"https://m.media-amazon.com/images/I/619eo8TigkL._AC_SX679_.jpg"}
        ];
        return sql.insertarProductos(productos);
    })
    .then(() =>{
        console.log("Productos insertados con exito");
        return sql.crearTablaCarritos();
    })    
    .then(() => {
        console.log("Tabla de Carritos Creada con Éxito");
        // Cargar un Carrito
        const carritos = [
            {
                "timestamp": new Date(),
            },
        ];
        return sql.insertarCarrito(carritos);
    })
    .then(() =>{
        console.log("Carrito Inicializado");
        return sql.crearTablaCarritosProductos();
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        sql.close();
    });
    
