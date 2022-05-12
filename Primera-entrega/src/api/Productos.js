//Defino el moment
const moment = require("moment");

//Creo una promesa
const fs = require("fs").promises;

//Defino la clase carrito 
class Productos {
  constructor() {
    (this.productos = []), (this.ruta = "./src/db/productos.txt"), (this.id = 1);
  }

  //Trae todos los productos
  async traerProductos() {
    try {
      const dataFs = await fs.readFile(this.ruta, "utf-8");
      if (dataFs.toString() != '') {
        this.productos = JSON.parse(dataFs)
        //this.id = this.productos[this.productos.length -1].id +1
        if (this.productos.length > 0) {
          this.id = parseInt(this.productos[this.productos.length - 1].id) + 1
        } else {
          this.id = 1
        }
      }
      return this.productos
    } catch (e) {
      if (e.code == "ENOENT") {
        fs.writeFile(this.ruta, '')
        return []
      }
    }
  }

  //Trae un producto segun el id que ponga, primero trae todos y luego se fija que tenga el id buscado
  async traerProducto(id) {
    const traerP = await this.traerProductos()
    const producto = this.productos.find((prod) => prod.id == id);

    return producto;
  }

  //Guardo los productos con sus repectivos datos, primero los busca luego los guarda
  async guardarProducto(data) {
    try {
      const dataProductos = await this.traerProductos()
      console.log(dataProductos);
      const nuevoProducto = {
        id: this.id,
        timestamp: moment().format("L LTS"),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
      };
      dataProductos.push(nuevoProducto);
      //console.log(dataProductos);
      await fs.writeFile(this.ruta, JSON.stringify(dataProductos));

    } catch (e) {
      console.log(e)
    }
    // return nuevoProducto;
  }

  //Elimins el producto segun el ID 
  async eliminarProducto(id) {
    try {
      const productosGuardados = await this.traerProductos()
      const nuevaLista = productosGuardados.filter(prod => prod.id !== parseInt(id));
      if (id >= 0) {
        await fs.writeFile(this.ruta, JSON.stringify(nuevaLista));
        return nuevaLista;
      }

    } catch (e) {
      console.log(e)
    }

  }

  //Actualiza segun los cambios
  async actualizarProducto(data, id) {
    try {
      const productosGuardados = await this.traerProductos()
      const actualizarDataProducto = {
        id: parseInt(id),
        timestamp: moment().format("L LTS"),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
      }
      const actualizarI = productosGuardados.findIndex((prod) => prod.id === parseInt(id))
      productosGuardados[actualizarI] = actualizarDataProducto
      await fs.writeFile(this.ruta, JSON.stringify(productosGuardados, null, 2))
      return actualizarDataProducto;
    } catch (error) {
      console.log("Error: No se ha podido actualizar el producto " + error)
    }
  }
}

//Exporta productos
module.exports = Productos;
