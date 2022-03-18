import { accessDao } from '../daos/access/index.js'

export default {

    getByQuery: async(email) => {
        const query = { 'email': email }

        const access = await accessDao.getByQuery(query)
        if (access) return access
        else return null
    },

    save: async(accessNew) => {
        const id = await accessDao.save(accessNew)
        return id
    }

}