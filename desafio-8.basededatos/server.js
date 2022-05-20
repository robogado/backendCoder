const express = require('express')
const Productos = require('./api/class/productosDB')
const app = express()
const port = 8080;


const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'));


const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
];

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });

});



httpServer.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})

const storeProducts = new Productos()
// storeProducts.listarProductos().then(data => console.log(data))
// (async ()=> {
//     const listaDeProductos = await storeProducts.listarProductos()
//     console.log(listaDeProductos)
// })()