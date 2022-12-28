import express from "express";
import cors from "cors";
import http from "http";
import serverRoutes from "./routes/index.js";
import Socket from "./utils/sockets/index.js";

//let Socket = require("./utils/sockets");

const app = express();
const PORT = process.env.PORT || 8080;
// Servidores
/* 1. HTTP SERVER */
const httpServer = http.createServer(app);

/* 2. Servidor WebSocket */
const socket = new Socket(httpServer);
socket.init();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static(__dirname + '/views'));
app.use(express.static("./views"));

// View Engine
//app.set("views", path.join(__dirname, "views"));
app.set("views", "./views");
app.set("view engine", "ejs");


//serverRoutes(app);
app.use("/api",serverRoutes);
app.use(cors());

httpServer.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));


