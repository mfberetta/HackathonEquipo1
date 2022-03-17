import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class AccessDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('access', {
            id: { type: String, required: true },
            name: { type: String, required: true },
            role: { type: String, required: true }
        })
    }
}

export default AccessDaoMongoDb