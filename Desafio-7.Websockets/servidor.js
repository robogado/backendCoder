const express = require("express");
const { Servidor: HttpServer } = require("http");
const { Servidor: IOServer } = require("socket.io");
const Productos = require("./api/Contenedor");
const HistoryChat = require("./api/chat");

//Se puede llamar con una variable y con eso uno va a la ruta que tiene en routes
const myRoutes = require("./api/routes");

module.exports = myRoutes;
const app = express();
const httpServer = nuevo HttpServer(app);
const io = nuevo IOServer(httpServer);

const storProd = nuevos Productos();
const history = nuevo HistoryChat();
consola.log(storProd, historial)

const mensajes = [];
io. on("connection", asincronico (socket) => {
  //Esto se ejecuta por cada cliente conectado
  consola. log("Un cliente se ha conectado");

  //emití envia
  zócalo. emit("productos", storProd. productosTodos);

  //en escucha
  zocalo. on("guardarProducto", (nuevoProducto) => {
    storProd. saveProduct(nuevoProducto);
    io. enchufes. emit("productos", storProd. productosTodos);
  });

  const message = historial de espera. loadMenssage();
  zocalo. emit("mensajes", mensaje);

  zocalo. on("messageNew", asincrónico (datos) => {
    a la espera de la historia. saveMessage(datos);
    const message2 = esperar historial. loadMenssage();
    io. enchufes. emit("mensajes", mensaje2);
  });

  zocalo. emit("productos", storProd. productosTodos);

  zocalo. on("newProd", (dataProd) => {
    storProd. saveProduct(dataProd);
    io. enchufes. emit("productos", storProd. productosTodos);
  })
});

aplicacion. use(express. static("./public"));
aplicacion. use(express. urlencoded({ extended: true }));
aplicacion. use(express. json());
aplicacion. use(myRoutes);

aplicacion. set("ver motor", "ejs");
aplicacion. set("views", "./public/views");

//servidor
const PORT = 8080;
httpServer. listen(PUERTO, () =>
  consola. log("Servidor corriendo en http://localhost:8080")
);