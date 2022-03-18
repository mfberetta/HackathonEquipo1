import { softDao } from '../daos/soft/index.js'
export default {

    getByQuery: async(email) => {
        const query = { "email": email }
        const soft = await softDao.getByQuery(query);
        if (soft) return soft
        else return null

    },
    getById: async(id) => {
        const soft = await softDao.getById(id)
        if (soft) return soft
        else return null
    },

    save: async(softNew) => {
        const id = await softDao.save(softNew)
        return id
    },

    deleteByIdSoft: async(id) => {
        const soft = await softDao.getById(id)
        if (soft) {
            const operacion = await softDao.deleteById(id)
            return true
        } else return null
    },

    update: async(id, softMod) => {
        if (!softMod.id) softMod = Object.assign({ id: id }, softMod)


        if (!softMod.id) return null
        if (!softMod.codigo) return null

        if (!softMod.nombre) return null
        if (!softMod.descripcion) return null
        if (!softMod.categoria) return null

        const soft = await softDao.getById(id)
        if (soft) {
            const operacion = await softDao.update(softMod)
            return true
        } else return null
    }
}