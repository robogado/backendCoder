const lista = require('../../api/productos/crud/list_productos')

class Productos  {
    constructor () {
        this.productos = [];
    }

    async listarProductos () {
        try{
             const listProd = await lista()
             return listProd
        }
        catch(e){
            console.log(`No se han podido listar los productos ${e.code}`)
        }
    }
    async guardarProductos(producto){
        
    }
}

module.exports = Productos