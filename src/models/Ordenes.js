import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class OrdenesDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('ordenes', {
            id: { type: String, required: true },
            email: {type: String, required: true },
            estado: {type: String, required: true },
            fyh: {type: String, required: true },
            items:[{
                id: { type: String, required: true },
                nombre: { type: String, required: true },
                cantidad: { type: Number, required: true },
                precioUnitario: { type: Number, required: true },
                subtotal: { type: Number, required: true }
            }]
        })
    }
}

export default OrdenesDaoMongoDb