import { trainingDao } from '../daos/training/index.js'


export default {

    getByQuery: async(email) => {
        const courses = await trainingDao.getByQuery({ 'email': email })
        if (courses) return courses
        else return null
    }

}