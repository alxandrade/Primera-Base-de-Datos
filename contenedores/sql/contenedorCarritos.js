import knexLib from 'knex';

class ContenedorCarritos {

  constructor(config) {
    this.knex = knexLib(config);
  }

  // Inserta datos a la tabla de carritos_productos
  async crearCarrito(carrito) {    
    return this.knex("carritos").insert(carrito);    
  }

  // Inserta datos a la tabla de carritos_productos
  async insertarProductosCarrito(idCarrito, idProducto) {
    return this.knex("carritos_productos").insert({
        carrito_id: idCarrito,
        producto_id: idProducto,
    });
  }

  // Listar TODOS los Productos de un Carrito
  async listarProductosDelCarrito(idCarrito) {
    return this.knex("productos")
        .select("producto_id")
        .where("carrito_id", idCarrito)
        .join("productos", "carritos_productos.producto_id", "productos.id")
        .select("productos.*");
  }

  // Listar todos los Carritos
  async listarCarritos(idCarrito) {
    try {
      const items = await this.knex("carritos").select("*");
      return items;
    } catch (error) {
      return error.message;
    }
  }

  // Listar un Carrito por Id
  async listarCarritoId(idCarrito) {
    try {
      const items = await this.knex("carritos").select("*").where("id", idCarrito);
      return items;
    } catch (error) {
      return error.message;
    }
  }

  // Borrar un producto de un carrito en especifico
  async borrarProductoDelCarritoPorId(idCarrito, idProducto) {
    return this.knex.from("carritos_productos")
        .where("carrito_id", idCarrito)
        .andWhere("producto_id", idProducto)
        .del();
  }

  // Borrar un carrito en especifico
  async borrarCarritoPorId(idCarrito) {
    try{
      const carritoBorrado = await this.knex.from("carritos").where("id", idCarrito).del();
      if (carritoBorrado > 0) {
        return true;
      } else {
        return false;
      }
    }catch (error) {
      return error.message;
    }
  }

  close() {
    this.knex.destroy();
  }
}

export default ContenedorCarritos

