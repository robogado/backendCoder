const express = require("express")
const pug = require("pug")

const routerProd = express.Router()
const Contenedor = require('./class/Contenedor')

const PORT = 8080

const app = express()
const guardarProd = new Contenedor() 


app.set('views', './views')
app.set('view engine', 'pug');


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', routerProd)


let vista = Boolean(true)

app.get('/', (req, res) => {
    vista = true
    res.render('index', {vista});
})

routerProd
.get('/', (req, res) => {
    const productos = guardarProd.productsAll
    vista = false
    res.render('index', {productos, vista});
})
.post('/', (req, res) => {
    // luego del guardado
    const nuevoProducto = guardarProd.saveProduct(req.body)
    vista = true
    console.log(nuevoProducto)
    res.render('index', {nuevoProducto, vista});
})

const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))