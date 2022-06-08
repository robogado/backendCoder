const ContenedorFirebase = require('../../contenedor/ContenedorFirebase')

class ProductosDAO extends ContenedorFirebase{
    constructor(){
        super()
    }

    async guardarProducto(data){
        const producto = await super.guardar(data, 'productos')
        return producto
    }

    async listarProductos(){
        let docs = await super.listar('productos')
        const res = docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            price: doc.data().price,
            url: doc.data().url,
        }))
        return res
    }

    async mostrarProducto(id){
        const producto = await super.mostrarElemento('productos', id)
        return producto
    }

    async actualizarProducto(data, id){
        const producto = await super.actualizar('productos', data, id)
        return producto
    }

    async eliminarProducto(id){
        const producto = await super.eliminar('productos', id)
        return producto
    }

}

module.exports = new ProductosDAO()