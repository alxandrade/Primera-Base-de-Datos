import knexLib from "knex";

class ContenedorProductos {
  constructor(config) {
    this.knex = knexLib(config);
  }

  // Insertar productos
  async insertarProductos(productos) {
    try {
      const new_product_id = await this.knex("productos").insert(productos);
      const new_product = await this.listarProductoPorId(new_product_id);
      return new_product;
    } catch (error) {
      return error.message;
    }
  }

  // Listar TODOS los productos
  async listarProductos() {
    try {
      const items = await this.knex("productos").select("*");
      return items;
    } catch (error) {
      return error.message;
    }
  }

  // Listar productos por Id
  async listarProductoPorId(id) {
    try {
      const items = await this.knex("productos").select("*").where("id", id);
      return items;
    } catch (error) {
      return error.message;
    }
  }

  // Borrar un Producto por Id
  async borrarProductoPorId(id) {
    try {
      const productoBorrado = await this.knex.from("productos").where("id", id).del();      
      if (productoBorrado > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return error.message;
    }
  }

  // Actualizar el stock de un producto
  async actualizarStockPorId(id, stock) {
    try {
      await this.knex
        .from("productos")
        .where("id", id)
        .update({ stock: stock });
      const update_product = this.listarProductoPorId(id);
      return update_product;
    } catch (error) {
      return error.message;
    }
  }

  // Actualizar el stock de un producto
  async actualizarProductoId(id, info) {
    try {
      const {codigo, descripcion, precio, stock, foto} = info
      await this.knex
        .from("productos")
        .where("id", id)
        .update({ 
          codigo, descripcion, precio, stock, foto,
        });
      const update_product = this.listarProductoPorId(id);
      return update_product;
    } catch (error) {
      return error.message;
    }
  }

  close() {
    this.knex.destroy();
  }
}

export default ContenedorProductos;
