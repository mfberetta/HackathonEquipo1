import servicioTraining from '../services/training.js'

export default {

    getByEmailCoursesApi: async(req, res, next) => {
        try {
            const email = req.user.email
            const courses = await servicioTraining.getByQuery(email)
            if (courses) res.json(courses)
            else res.json({ error: 'Sin curso asignado' })
        } catch (error) {
            next(error)
        }
    }


}