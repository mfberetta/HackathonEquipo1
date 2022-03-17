import servicioTraining from '../servicios/training.js'

export default {
    // getCourses: async(req, res) => { //vista de productos
    //     return res.render('productos.ejs')
    // },

    getCoursesApi: async(req, res, next) => { //Devuelve todos los productos
        try{
            const courses = await servicioTraining.getAll()
            res.json(courses)
        }
        catch(error){
            next(error)
        }
    },

    getByIdCoursesApi: async(req, res, next) => { //Devuelve producto por id
        try{ 
            let id = req.params.id;
            const courses = await servicioTraining.getById(id)
            if(courses) res.json(courses) //devuelve el producto
            else res.json({ error : 'producto no encontrado' })
        }
        catch(error){
            next(error)
        }
    },

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

    // postProductosApi: async (req, res, next) => { //Agrega producto
    //     try{
    //         const id = await servicioTraining.save(req.body)
    //         if(id) res.json({id: id})
    //         else res.json({ error : 'campos incompletos o no válidos' })
    //     }
    //     catch (error){
    //         next(error)
    //     }
    // },

    // deleteByIdProductosApi: async (req,res,next)=>{ //Elimina producto por id
    //     try{ 
    //         let id = req.params.id;
    //         const resultado = await servicioTraining.deleteByIdProducto(id)
    //         if(resultado){
    //             res.json({ resultado: 'producto eliminado' })
    //         } 
    //         else res.json({ error : 'producto no encontrado' })
    //     }
    //     catch(error){
    //         next(error)
    //     }
    // },

    // putByIdProductosApi: async (req,res,next)=>{ //Actualiza productos por id
    //     try{ 
    //         let id = req.params.id;
    //         let productoMod = req.body
    //         let resultado = await servicioTraining.update(id,productoMod) 
    //         if(resultado){
    //             res.json({ resultado: 'producto actualizado' })
    //         } 
    //         else res.json({ error : 'producto no encontrado y/o campos incompletos o no válidos' })
    //     }
    //     catch(error){
    //         next(error)
    //     }
    // }
}