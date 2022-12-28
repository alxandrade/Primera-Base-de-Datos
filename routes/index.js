import { Router } from "express";
import productoRoutes from "../routes/producto.js";
import carritoRoutes from "../routes/carrito.js";

const apiRouter = Router();

apiRouter.use("/productos", productoRoutes);
apiRouter.use("/carritos", carritoRoutes);

export default apiRouter;

/*module.exports = app => {    
    carritoRoutes(app);
    productoRoutes(app);
    
    //Raiz del proyecto
    app.get("/",(req, res, next) =>{        
        res.redirect('/api/productos');
    });
}*/