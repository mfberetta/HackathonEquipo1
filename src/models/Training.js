import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class TrainingDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('training', {
            id: { type: String, required: true },
            name: { type: String, required: true },
            role: { type: String, required: true }
        })
    }
}

export default TrainingDaoMongoDb