const { options } = require("../../../options/mariaDB");
const knexmdb = require("knex")(options);

const lista = async () => {
  const productos = await knexmdb("productosTabla").select("*");
  return productos;
};

const operationDb = {
    lista : lista,

}


module.exports = operationDb;