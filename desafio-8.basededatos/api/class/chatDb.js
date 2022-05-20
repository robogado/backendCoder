const dbSqlLite = require('../../options/sqlite3')
const knexmdb = require("knex")(dbSqlLite);


class ChatDb {
    constructor(mensajes) {
        this.mensajes = []
    }

    // async agregarMensaje(mensaje) {
    //     this.mensajes.push(mensaje)
    // }
    async getAllMessages(){
        const chat = await knexmdb("chatTabla").select("*");
        return chat;
    }

}