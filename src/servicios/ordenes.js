import { ordenesDao } from '../daos/ordenes/index.js'

export default {
    getAll: async() => { //Devuelve todas las ordenes
        const ordenes = await ordenesDao.getAll()
        return ordenes
    },

    getById: async(id) => { //Devuelve orden por id
        const orden = await ordenesDao.getById(id)
        if(orden) return orden
        else return null
    },

    getByEmail: async(email) => { //Devuelve orden por email
        const ordenes = await ordenesDao.getByEmail({'email':email})
        if(ordenes) return ordenes
        else return null
    }
}
