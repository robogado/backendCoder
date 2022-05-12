//Defino el moment
const moment = require("moment");
//Creo una promesa
const fs = require("fs").promises;

//Defino la clase carrito 
class Carrito {
    constructor() {
        this.carrito = [],
            this.ruta = "./src/db/carrito.txt",
            this.id = 1
    }

    //Lee el txt, parsea los datos y retorna un carrito
    async traerTodosLosCarritos() {
        try {
            const listaCarrito = await fs.readFile(this.ruta)
            if (listaCarrito.toString() != '') {
                this.carrito = JSON.parse(listaCarrito)
                this.id = this.carrito[this.carrito.length - 1].id + 1
            }
            return this.carrito
        } catch (error) {
            console.log("Error: No se ha podido escribir el archivo " + error)
        }
    }

    //Crea un nuevo carrito
    async crearCarrito() {
        try {
            const carritoCargado = await this.traerTodosLosCarritos()
            const nuevoCarrito = {
                id: this.id,
                timestamp: moment().format('L LTS'),
                productos: []
            }
            carritoCargado.push(nuevoCarrito)
            await fs.writeFile(this.ruta, JSON.stringify(carritoCargado))
            return nuevoCarrito
        } catch (error) {
            console.log("Error " + error)
        }
    }

    //Borra solamente el id que le estoy pasando 
    async borrarCarrito(id) {
        const carritoCargado = await this.traerTodosLosCarritos()
        const borradoI = carritoCargado.findIndex((cart) => cart.id === parseInt(id))

        if (borradoI === -1) {
            return -1
        } else {
            const borrarCarritos = carritoCargado.splice(borradoI, 1)
            await fs.writeFile(this.ruta, JSON.stringify(carritoCargado))
            return borrarCarritos
        }
    }

    //Busca el producto segun el id
    async encontrarCarrito(id) {
        try {
            const traerCarritos = await this.traerTodosLosCarritos()
            const carritoId = traerCarritos.find(cart => cart.id == parseInt(id))
            return carritoId.productos //de donde sale 
        } catch (error) {
            console.log("Error " + error)
        }
    }

    //Agrega un producto al carrito, siempre y cuando el carrito exista
    async agregarProductoEnCarrito(id, producto) {
        try {
            const traerCarritos = await this.traerTodosLosCarritos()
            const carritoId = traerCarritos.find(cart => cart.id == parseInt(id))
            if (carritoId) {
                carritoId.productos.push(producto)
                await fs.writeFile(this.ruta, JSON.stringify(traerCarritos))
                return carritoId
            } else {
                throw new Error("No se encontró el carrito")
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }

    //Elimina el producto segun el id que se le pase
    async eliminarProductoEnCarrito(idCarrito, idProducto) {
        try {
            const carritoCargado = await this.traerTodosLosCarritos()
            const cartById = carritoCargado.find(cart => cart.id === parseInt(idCarrito))
            if (cartById) {
                console.log(cartById)
                const indiceCarrito = carritoCargado.findIndex((cart) => cart.id === parseInt(idCarrito))
                const deleteI = cartById.productos.findIndex((prod) => prod.id === parseInt(idProducto))
                if (deleteI != -1) {
                    cartById.productos.splice(deleteI, 1)
                    carritoCargado[indiceCarrito] = cartById
                    await fs.writeFile(this.ruta, JSON.stringify(carritoCargado))
                    return cartById
                }
            } else {
                throw new Error("No se encontró el carrito")
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }

}

//Exporta carrito
module.exports = Carrito