const options = require('knex')(
    {
        client: 'sqlite3',
        connection: {
            filename: "./mydb.sqlite"
        }
    });


module.exports = { options }