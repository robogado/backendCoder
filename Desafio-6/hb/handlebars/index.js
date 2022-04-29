const express = require("express")
const handlebars = require('express-handlebars')
const routerProd = express.Router()
const Contenedor = require('./class/Contenedor')

const PORT = 8080

const app = express()
const guardarProd = new Contenedor()
let forms = Boolean(true)


app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/productos', routerProd)
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('form');
})

routerProd

    .get('/', (req, res) => {

        const prods = guardarProd.productsAll
        res.render('table', { prods });

    })

    .post('/', (req, res) => {
        // luego del guardado
        const productoNuevo = guardarProd.saveProduct(req.body)
        res.render('form');
    })


const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))