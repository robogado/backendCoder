const express = require('express');
const {Router} = express
const Contenedor = require('./Contenedor')
const app = express();
const router = Router()

const port = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/public'))
app.use('/', router)
const storeProducts = new Contenedor()


app.set('views', './views')
app.set('view engine', 'pug');

app.get("/", (req,res )=> {
    res.status(200).send("Aloha")
})
app.get("/layout", (req,res)=> {
    res.render('layout.pug', {mensaje: 'Usando pug con express'})
    })


app.listen(port, ()=> {
    console.log(`Listening to request on http://localhost:${port}`)
})