import mongoose from 'mongoose'
import config from '../../config/config.js'
import { v4 as uuidv4 } from 'uuid'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async save(object) {
        //Recibe un objeto, lo inserta en la tabla.
        const id = uuidv4() //gernera id random
        object.id = id //inserta id en el objeto
        const usuarioSaveModel = new this.coleccion(object)
        await usuarioSaveModel.save()
        return id
    }

    async create(object){ 
        //Recibe un objeto, lo inserta en la tabla sin id custom
        const usuarioSaveModel = new this.coleccion(object)
        await usuarioSaveModel.save()
    }
    
    async getAll(){
        //Devuelve todos los registros.
        return await this.coleccion.find({},{_id:0,__v:0})
    }

    async getByEmail(query){ 
        //Devuelve según el email de la query.
        return await this.coleccion.find(query)
    }

    async getById(id){
        //Recibe un id y devuelve registro con ese id, o null si no está.
        return await this.coleccion.findOne({id:id},{_id:0,__v:0})
    }
    
    async deleteById(id) {
        //Elimina el registro segun id.
        //console.log(id)
        return await this.coleccion.deleteOne({id:id}) 
    }

    async deleteAll(){
        //Elimina todos los registros.
        return await this.coleccion.deleteMany({})        
    }
    
    async update(object) {
        //Actualiza elemento según id.
        const id = object.id //obtengo el id para el filtro
        return await this.coleccion.replaceOne({id:id},object)
    }

    async close() {
        mongoose.connection.close()
    }
}

export default ContenedorMongoDb