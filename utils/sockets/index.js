import { Server as SocketIO} from "socket.io";
import { options } from "../../config/configDB.js";
import ContenedorMensajes from "../../contenedores/sql/contenedorMesajes.js";
const sqlMensajes = new ContenedorMensajes(options.sqlite);

class Socket{
    static instancia;
    constructor(http){
      if(Socket.instancia){
        return Socket.instancia;
      }
      Socket.instancia = this;
      this.io = new SocketIO(http);
      this.mensajes = [];
      this.usuarios = [];
    }
    init(){
      try {
        this.io.on('connection', socket =>{
          console.log("Usuario conectado!");
          this.io.sockets.emit("init", this.mensajes);

          // Escuchamos el mensaje de un usuario y lo emitimos a todos los conectados
          socket.on("mensaje", data =>{            
            console.log(data);
            sqlMensajes.insertarMensajes(data)
            this.mensajes.push(data);
            this.io.sockets.emit("listenserver", this.mensajes);
          });

          socket.on("addUser", data =>{
            console.log(data);
            if(this.usuarios.length){
              let verificacion_user = false;
              this.usuarios = this.usuarios.map(usuario =>{
                if(usuario.mail == data.mail){
                  verificacion_user = true;
                  return {
                    id: socket.id,
                    ...data,
                    active: true
                  }
                }else{
                  return usuario;
                }
              })
              if(!verificacion_user){
                this.usuarios.push({
                  id: socket.id,
                  ...data,
                  active: true
                })
              }
            }else{
              this.usuarios.push({
                id: socket.id,
                ...data,
                active: true
              })
            }
            this.io.sockets.emit("loadUsers", this.usuarios);
          });

          socket.on("disconnect", () =>{
            console.log("Se desconectó ", socket.id);
            this.usuarios = this.usuarios.map(usuario =>{
              if(usuario.id == socket.id){
                delete usuario.active;
                return {
                  ...usuario,
                  active: false
                }
              }else{
                return usuario;
              }
            });            
            this.io.sockets.emit("loadUsers", this.usuarios);
          })
        })
      } catch (error) {
        console.log(error);
      }
    }
}


export default Socket;