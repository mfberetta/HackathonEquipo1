import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class SoftDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('soft', {
            id: { type: String, required: true },
            email: { type: String, required: true },
            softs: [{
                name: { type: String, required: true },
                role: { type: String, required: true }
            }]
        })
    }
}

export default SoftDaoMongoDb