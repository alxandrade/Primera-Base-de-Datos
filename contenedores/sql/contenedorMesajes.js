import knexLib from "knex";

class ContenedorMensajes {
  constructor(config) {
    this.knex = knexLib(config);
  }

  // Insertar Mensajes
  async insertarMensajes(mensajes) {
    try {
      let { usuario, mail, tiempo, mensaje } = mensajes;
      let obj = {usuario, mail, mensaje };      
      const new_mensaje_id = await this.knex("mensajes").insert(obj);
      return new_mensaje_id;
    } catch (error) {
      return error.message;
    }
  }

  close() {
    this.knex.destroy();
  }
}

export default ContenedorMensajes;
