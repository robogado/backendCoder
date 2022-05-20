const {options} = require('../../../options/mariaDB');
const knex = require('knex')(options);

const productos = [
    { name: "Petardos",
      price: 500,
      url : "www.tusanga.net"
    },
    { name: "Calabaza",
      price: 500,
      url : "www.tusanga.net"
    },
    { name: "Papitas",
      price: 500,
      url : "www.tusanga.net"
    },
    { name: "Chizito",
      price: 500,
      url : "www.tusanga.net"
    },
]

knex('productosTabla').insert(productos)
.then(()=> console.log("Se han podido insertar los productos"))
.catch((err)=> { console.log(`No se han podido cargar los productos ${err}`); throw err})
.finally( ()=> {
    knex.destroy()
})