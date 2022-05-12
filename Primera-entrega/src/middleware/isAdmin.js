//Funcion para verificar si es administrador el que quiere realizar los cambios, si es true los realiza si es false no los realiza
const isAdmin = rol => {
    return (req, res ,next) => {
        if (rol) {
            next()
        } else {
            res.status(403).json({
                error: -1 , 
                descripcion: `Ruta: ${req.originalUrl} Metodo: ${req.method} no autorizada`
            })
        }
    }
}

module.exports = isAdmin