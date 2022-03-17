import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('productos', {
            id: { type: String, required: true },
            timestamp: { type: String, required: true },
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            categoria: { type: String, required: true },
            codigo: { type: String, required: true },
            foto: { type: String, required: true },
            precio: { type: Number, required: true }, 
            stock: { type: Number, required: true }
        })
    }
}

export default ProductosDaoMongoDb