import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            id: { type: String, required: true },
            email: {type: String, required: true },
            direccion: {type: String, required: true },
            fyh: {type: String, required: true },
            productos:[{
                id: { type: String, required: true },
                cantidad: { type: Number, required: true }
            }]
        })
    }
}

export default CarritosDaoMongoDb