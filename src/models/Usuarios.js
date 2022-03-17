import ContenedorMongoDb from "../contenedores/contenedorMongoDB.js"

class UsuariosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('usuarios', {
            email: { type: String, required: true },
            password: { type: String, required: true },
            name: { type: String, required: true },
            lastname: { type: String, required: true },
            phone: { type: String, required: true },
            role: { type: String, required: false },
            objectives: { type: String, required: false },
            members:[{
                name: { type: String, required: false },
                role: { type: String, required: false }
            }]
        })
    }
}

export default UsuariosDaoMongoDb