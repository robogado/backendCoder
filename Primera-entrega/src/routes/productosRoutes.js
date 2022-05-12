//Importo las dependencias que necesito 
const express = require('express')
const productRoutes = express.Router()
const isAdmin = require('../middleware/isAdmin')
const Productos = require('../api/Productos')
const prodTienda = new Productos()

//Verifica si soy administrador, si es true si, si es false no
const rolAdmin = true;

productRoutes.get('/', async (req,res)=> {
    const productos = await prodTienda.traerProductos()
    res.status(200).json(productos)
})
productRoutes.get('/:id', async (req,res)=> {
    const id = req.params.id
    const producto = await prodTienda.traerProducto(id)
    if(producto) {
        res.status(200).json(producto)
    } else {
        res.status(404).json({error: 'Error, no se encuentra el producto buscado'})
    }
})

//Si sos administrador te guarda el producto que queres agregar
productRoutes.post('/',isAdmin(rolAdmin), async  (req,res)=> {
    const productoNuevo = await  prodTienda.guardarProducto(req.body)
    res.status(201).json(productoNuevo)
    
})
productRoutes.put('/:id',isAdmin(rolAdmin), async (req,res)=> {
    try {
        const actualizarProducto = await prodTienda.actualizarProducto(req.body, req.params.id)
        res.status(200).json(actualizarProducto)
    }catch (error) {
        res.status(500).json({error: error.message})
    }
})
//Si sos administrador elimina los productos
productRoutes.delete('/:id', isAdmin(rolAdmin), async (req,res)=> {
   try {
       const id = req.params.id
       const borrarProducto = await prodTienda.eliminarProducto(id)
       res.status(202).json(borrarProducto)

   } catch (e) {
       res.status(500).json()
   }
})

module.exports = productRoutes