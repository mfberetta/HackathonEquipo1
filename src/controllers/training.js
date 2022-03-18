import servicioTraining from '../servicios/training.js'

export default {

    getByEmailCoursesApi: async(req, res, next) => { //Devuelve cursos por el email del usuario
        try{ 
            const email = req.user.email
            const courses = await servicioTraining.getByQuery(email)
            if(courses) res.json(courses) //devuelve los cursos
            else res.json({ error : 'Sin curso asignado' })
        }
        catch(error){
            next(error)
        }
    }


}