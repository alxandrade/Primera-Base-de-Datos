import knexLib from "knex";


class ClientSQL {
  constructor(config) {
    this.knex = knexLib(config);
  }
  
  // Crea tabla de Productos
  crearTablaProductos() {
    return this.knex.schema.dropTableIfExists("productos").finally(() => {
      return this.knex.schema.createTable("productos", (table) => {
        table.increments("id").primary();        
        table.string("codigo", 20).notNullable();        
        table.string("descripcion");
        table.float("precio");
        table.integer("stock");
        table.text("foto");        
        table.dateTime("timestamp").defaultTo(this.knex.fn.now());
      });
    });
  };

  // Inicializamos los datos de Productos
  insertarProductos(productos) {
    return this.knex("productos").insert(productos);
  }

  // Crea tabla de Carritos
  crearTablaCarritos() {
    return this.knex.schema.dropTableIfExists("carritos").finally(() => {
      return this.knex.schema.createTable("carritos", (table) => {
        table.increments("id").primary();        
        table.dateTime("timestamp").defaultTo(this.knex.fn.now());
      });
    });
  };

  // Inicializamos el Carrito
  insertarCarrito(carritos) {
    return this.knex("carritos").insert(carritos);
  }

  // Crea tabla de Carritos_Productos - Many to Many
  crearTablaCarritosProductos() {
    return this.knex.schema.dropTableIfExists("carritos_productos").finally(() => {
      return this.knex.schema.createTable("carritos_productos", (table) => {
        table.increments("id").primary();        
        table.integer("carrito_id").unsigned().references("id").inTable("carritos");
        table.integer("producto_id").unsigned().references("id").inTable("productos");
        table.integer("cantidad");
      });
    });
  };

  // Crea tabla de Mensajes
  crearTablaMensajes () {
    return this.knex.schema.dropTableIfExists("mensajes").finally(() => {
      return this.knex.schema.createTable("mensajes", (table) => {
        table.increments("id").primary();        
        table.string("usuario").notNullable();        
        table.string("mail");
        table.string("mensaje");        
        table.dateTime("timestamp").defaultTo(this.knex.fn.now());
      });
    });
  }

  close(){
    this.knex.destroy();
  }
}

export default ClientSQL;
