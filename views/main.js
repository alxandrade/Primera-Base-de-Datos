let socket = null;
let usuario = null;
let inputtext = document.getElementById("inputtext");
let send_socket = document.getElementById("send_socket");
let container_chat = document.getElementById("container_chat");
let parrafochat = document.getElementById("parrafochat");
let form_data_user = document.getElementById("data_user");

form_data_user.addEventListener("submit", evt =>{
    evt.preventDefault();
    usuario = {
        usuario: evt.target[0].value,
        mail: evt.target[1].value,
        date: getNow()
    }

    if(usuario.usuario == "" || usuario.mail == "") window.location.reload();
        socket = io();
        socket.emit("addUser", usuario);
        container_chat.classList = "active";
        readSockets();
    });

    getNow = () => {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes()}`;
    }
    
    function readSockets(){
        loadChat();
        socket.on("listenserver", data =>{
            console.log("Recibiendo..", data);
            loadData(data);
        });
    }
  
    function loadChat(){
        socket.on("init", data => {
            loadData(data);
        })

        socket.on("loadUsers", data =>{
            console.log("Evento loadUsers --> ",data);
        })
    }
  
    function loadData(data){
        let innerP = ``;
        data.forEach(element =>{
            innerP += `<b style="color:blue">${element.usuario}:</b> ${element.date} - ${element.mensaje} </br>`;
        });
        parrafochat.innerHTML = innerP;
    }
  
    send_socket.addEventListener("click", evt =>{
        let sendMessage = {
            ...usuario,
            mensaje: inputtext.value
        }
        socket.emit("mensaje", sendMessage);
        inputtext.value = "";
    });

    function showProductDetail(productId) {
        window.location.href = `/api/productos/${productId}`;
    };

    function agregaCarrito(productId) {
        window.location.href = `/api/carrito/`;
    };