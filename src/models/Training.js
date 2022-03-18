import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class TrainingDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('training', {
            id: { type: String, required: true },
            email: { type: String, required: true },
            courses:[{
                name: { type: String, required: false },
                start: { type: Date, required: false },
                duration: { type: String, required: false }
            }]
        })
    }
}

export default TrainingDaoMongoDb