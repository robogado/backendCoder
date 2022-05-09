const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Productos = require("./api/Contenedor");
const HistoryChat = require("./api/chat");

// Se puede llamar con una variable y con eso uno va a la ruta que tiene en routes
const myRoutes = require("./api/routes");

//module.exports = myRoutes;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const storProd = new Productos();
const history = new HistoryChat();

//const messages = [];
io.on("connection", async (socket) => {
  // Esto se ejecuta por cada cliente conectado
  console.log("Un cliente se ha conectado");

  //emit envia
  socket.emit("productos", storProd.productsAll);

  //on escucha
  socket.on("guardarProducto", (nuevoProducto) => {
    storProd.saveProduct(nuevoProducto);
    io.sockets.emit("productos", storProd.productsAll);
  });

  const message = await history.loadMessage();
  socket.emit("messages", message);

  socket.on("messageNew", async (data) => {
    await history.saveMessage(data);
    const message2 = await history.loadMessage();
    io.sockets.emit("messages", message2);
  });

  socket.emit("products", storProd.productsAll);

  socket.on("newProd", (dataProd) => {
    storProd.saveProduct(dataProd);
    io.sockets.emit("products", storProd.productsAll);
  });
});

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(myRoutes);

app.set("view engine", "ejs");
app.set("views", "./public/views");

//server
const PORT = 8080;
httpServer.listen(PORT, () =>
  console.log("Servidor corriendo en http://localhost:8080")
);