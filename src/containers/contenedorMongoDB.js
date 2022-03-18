import mongoose from 'mongoose'
import config from '../../config/config.js'
import { v4 as uuidv4 } from 'uuid'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async save(object) {
        const id = uuidv4()
        object.id = id
        const usuarioSaveModel = new this.coleccion(object)
        await usuarioSaveModel.save()
        return id
    }

    async create(object) {
        const usuarioSaveModel = new this.coleccion(object)
        await usuarioSaveModel.save()
    }

    async getAll() {
        return await this.coleccion.find({}, { _id: 0, __v: 0 })
    }

    async getByQuery(query) {
        return await this.coleccion.find(query)
    }

    async getById(id) {
        return await this.coleccion.findOne({ id: id }, { _id: 0, __v: 0 })
    }

    async deleteById(id) {
        return await this.coleccion.deleteOne({ id: id })
    }

    async deleteAll() {
        return await this.coleccion.deleteMany({})
    }

    async update(object) {
        const id = object.id
        return await this.coleccion.replaceOne({ id: id }, object)
    }

    async close() {
        mongoose.connection.close()
    }
}

export default ContenedorMongoDb