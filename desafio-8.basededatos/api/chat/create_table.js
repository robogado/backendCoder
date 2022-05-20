const { options } = require('../../options/sqlite3')
const knexSqlite = require("knex")(options);

knexSqlite.schema.hasTable('chatTabla').then(async (exists) => {
    if (!exists) {
        await knexSqlite.schema.createTable('chatTabla', table => {
            table.increments('id');
            table.string('author');
            table.string('text')
        }
        )
        knexSqlite.destroy()
    } else {
        console.log('La tabla ya existe, no se ha realizado ninguna acción')
    }
})