import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class MensajesDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('mensajes', {
            id: { type: String, required: true },
            email: { type: String, required: true },
            tipo: { type: String, required: true },
            fyh: { type: String, required: true },
            texto: { type: String, required: true }
        })
    }
}

export default MensajesDaoMongoDb