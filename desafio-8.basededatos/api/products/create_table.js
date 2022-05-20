const {options} = require('../../options/mariaDB');
const knex = require('knex')(options);

// (async () => {
//     try {
//         await knex.schema.createTable('productosTabla', table => {
//             table.increments('id');
//             table.string('name');
//             table.integer('price');
//             table.string('url')
//         })
//     } catch (e){
//         console.log(`No se ha podido realizar la creación de la tabla debido al error ${e}`)
//     } finally {
//         knex.destroy();
//     }
// })();

knex.schema.hasTable('productosTabla').then( async (exists)  => {
        if(!exists){
            await knex.schema.createTable('productosTabla', table => {
                            table.increments('id');
                            table.string('name');
                            table.integer('price');
                            table.string('url')
        }
        )
        knex.destroy()
    } else {
        console.log('La tabla ya existe, no se ha realizado ninguna acción')
    }
})
