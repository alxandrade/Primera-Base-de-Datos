import { Router } from "express";
const router = Router();
import { options } from "../config/configDB.js";
import ContenedorProductos from "../contenedores/sql/contenedorProductos.js";
const sqlProducto = new ContenedorProductos(options.mysql);

// Traer los datos de todos los producto
router.get("/", async (req, res, next) => {
  try {
    let accion = "listaProductos";
    const productos = await sqlProducto.listarProductos();
    productos
      ? res.status(200).render("index.ejs", { productos, accion })
      : res.status(404).json({ message: "No hay productos disponibles" });
  } catch (error) {
    console.log(error);
  }
});

//Traer los datos de todos los producto cuando se dara de alta
router.get("/alta", async (req, res, next) => {
  try {
    const productos = await sqlProducto.listarProductos();
    let accion = "altaProductos";
    productos
      ? res.status(200).render("index.ejs", { productos, accion })
      : res.status(404).json({ message: "No hay productos disponibles" });    
  } catch (error) {
    console.log(error);
  }
});

// Traer los datos de un producto de un ID
router.get("/:id", async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    let accion = "detalleProducto";
    let productos = await sqlProducto.listarProductoPorId(id);    
    if (productos.length > 0) {
      res.status(200).json(productos);
      //res.status(200).render("index.ejs", { productos, accion });
    } else {
      res.status(400).json({ error: `Producto No Encontrado con ID: ${id}` });
    }
  } catch (error) {
    console.log(error);
  }
});

// Agregar nuevo producto al archivo (BD)
router.post ("/", async (req, res, next) =>{
    try{
        let {codigo, descripcion, precio, stock, foto} = req.body
        if(!codigo||!descripcion||!foto||!precio||!stock){
            console.log("Faltan datos");
        } else {                                        
            let obj = req.body;                        
            sqlProducto.insertarProductos(obj);
            res.redirect('/api/productos');
        }
    } catch(error){
        console.log(error);
    }
});

// Modificar los datos de un ID (Probar por PostMan)
router.put("/:id", async (req, res, next) => {
    try{
        let {codigo, descripcion, precio, stock, foto} = req.body;
        if(!codigo||!descripcion||!foto||!precio||!stock){            
            res.status(400).json("Faltan datos");
        } else {
            let id = parseInt(req.params.id);            
            let nuevosDatos = req.body;
            const productoAcualizado = await sqlProducto.actualizarProductoId(id, nuevosDatos);
            if(productoAcualizado.length > 0){
                res.status(200).json(productoAcualizado);
            } else {
                res.status(400).json({ error: `Producto No Encontrado con ID: ${id}` });
            }
        };        
        //res.redirect("/api/productos");
    } catch(error){
        console.log(error);
    }    
});

// Borrar los datos de un ID (Probar por Postman)
router.delete ("/:id", async (req, res, next) =>{
    try{
        let id = parseInt(req.params.id);
        const fueBorrado = await sqlProducto.borrarProductoPorId(id);        
        fueBorrado
        ? res.status(200).json({ message: "Producto borrado con éxito", id: req.params.id })
        : res.status(404).json({ message: "Producto no encontrado: id "  + req.params.id });                  
        let accion = 'listaProductos';  
        //res.render('index.ejs', {productos, accion})
    } catch (error){
        console.log(error);
    }
});

export default router;
