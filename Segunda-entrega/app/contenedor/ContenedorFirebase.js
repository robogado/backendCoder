const {admin, serviceAccount} = require('../config/config')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://segunda-entrega-6f0b7.firebaseio.com'
})
const db = admin.firestore()

module.exports = class ContenedorFirebase{
    constructor(){
        this.dbf = db
    }

    async guardar(data, coleccion) {
        const query = db.collection(coleccion)
        const doc = query.doc()
        const elemento = await doc.create(data)
        return elemento
    }

    async listar(coleccion){
        const query = db.collection(coleccion)
        const query2 = await query.get()
        let docs = query2.docs
        return docs
    }

    async listarSublista(coleccion, modelo){

        const query = db.collection(coleccion).doc(modelo)
        const query2 = await query.get()
        let docs = query2.docs
        return docs
    }
    
    async mostrarElemento(coleccion, id){
        const query = db.collection(coleccion)
        const doc = query.doc(id)
        const item = await doc.get()
        const res = item.data()
        return res
    }
    
    async actualizar(coleccion, data, id){
        const query = db.collection(coleccion)
        const doc = query.doc(id)
        const item = await doc.update(data, {id: id})
        return item
    }

    async eliminar(coleccion, id){
        const query = db.collection(coleccion)
        const doc = query.doc(id)
        const item = await doc.delete({id: id})
        return item
    }
}