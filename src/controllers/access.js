import servicioAccess from '../servicios/access.js'

export default {
    
    getAccessApi: async(req, res, next) => { //Devuelve acceso
        try{ 
            const user = req.body.email
            const access = await servicioAccess.getByQuery(user)
            if(access) res.json(access) //devuelve accesos
            else res.json({ error : 'accessos no encontrados' })
        }
        catch(error){
            next(error)
        }
    },

    postAccessApi: async (req, res, next) => { //Agrega producto
        try{
            const id = await servicioAccess.save(req.body)
            if(id) res.json({id: id})
            else res.json({ error : 'campos incompletos o no válidos' })
        }
        catch (error){
            next(error)
        }
    }

    //,deleteAccessApi: async (req,res,next)=>{ //Elimina accesos
    //    try{ 
    //        const user = req.body.email;
    //        const resultado = await servicioAccess.deleteAccess(user)
    //        if(resultado){
    //            res.json({ resultado: 'acceso eliminado' })
    //        } 
    //        else res.json({ error : 'acceso no encontrado' })
    //    }
    //    catch(error){
    //        next(error)
    //    }
    //},
//
    //putAccessApi: async (req,res,next)=>{ //Actualiza accesos
    //    try{ 
    //        let id = req.params.id;
    //        let productoMod = req.body
    //        let resultado = await servicioProductos.update(id,productoMod) 
    //        if(resultado){
    //            res.json({ resultado: 'producto actualizado' })
    //        } 
    //        else res.json({ error : 'producto no encontrado y/o campos incompletos o no válidos' })
    //    }
    //    catch(error){
    //        next(error)
    //    }
    //}
}