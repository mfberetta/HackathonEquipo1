import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class AccessDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('access', {
            id: { type: String, required: true },
            email: { type: String, required: true },
            accesses:[{
                name: { type: String, required: true },
                description: { type: String, required: true }
            }]
        })
    }
}

export default AccessDaoMongoDb