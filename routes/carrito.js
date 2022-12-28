import { Router } from "express";
const router = Router();
import { options } from "../config/configDB.js";
import ContenedorCarritos from "../contenedores/sql/contenedorCarritos.js";
const sqlCarrito = new ContenedorCarritos(options.mysql);

// Variable para manejar el acceso; TRUE es Admin; FALSE no acceso
const admin = true;

// Traer TODOS los Carritos
router.get("/", async (req, res) => {
  if (admin) {
    let carritos = await sqlCarrito.listarCarritos();
    let mensaje = null;
    let accion = "TodosLosCarritos";
    
    carritos
      ? res.status(200).json(carritos)
      : res.status(404).json({ message: "No hay productos disponibles" });
    //res.render("carrito.ejs", { carrito, accion, mensaje });
    res.status()
  } else {
    const carrito = null;
    let accion = "SinAccesoCarrito";
    const mensaje = "No tiene permisos para acceder a esta sección";
    res.render("index.ejs", { carrito, accion, mensaje });
  }
});

// Traer los datos de un Carrito de un ID
router.get ("/:id", async (req, res, next) =>{    
    try {
        let id = parseInt(req.params.id);          
        let accion = 'detalleCarrito';              
        const mensaje = "";
        const carrito = await sqlCarrito.listarCarritoId(id);
        carrito
            ? res.status(200).json(carrito)
            : res.status(404).json({ message: "No existe el Carrito con el Id " + id});              
    } catch (error) {
        console.log(error);
    }
});

// Traer los productos de un Carrito de un ID
router.get ("/productos/:id", async (req, res, next) =>{    
    try {
        let id = parseInt(req.params.id);          
        let accion = 'detalleCarrito';              
        const mensaje = "";
        const carrito = await sqlCarrito.listarProductosDelCarrito(id);
        carrito
            ? res.status(200).json(carrito)
            : res.status(404).json({ message: "No existe el Carrito con el Id " + id});              
    } catch (error) {
        console.log(error);
    }
});

// Agregar nuevo Carrito
router.post ("/", async (req, res, next) =>{
    try {                                       
        let obj = req.body;
        const IdCarrito = await sqlCarrito.crearCarrito(obj);
        const carrito = await sqlCarrito.listarCarritoId(IdCarrito);
        carrito
            ? res.status(200).json(carrito)
            : res.status(404).json({ message: "No existe el Carrito con el Id " + id});
    } catch (error) {
        console.log(error);
    }
});

// Borrar los datos de un carrito por su ID
router.delete ("/:id", async (req, res, next) =>{
    try{
        let id = parseInt(req.params.id);
        const fueBorrado = await sqlCarrito.borrarCarritoPorId(id);
        fueBorrado
        ? res.status(200).json({ message: "Carrito borrado con éxito", id: req.params.id })
        : res.status(404).json({ message: "Carrito no encontrado: id "  + req.params.id });                  
        let accion = 'borrarCarritoId';  
        //res.render('index.ejs', {productos, accion})
    } catch{
        console.log(error);
    }
});

export default router;
