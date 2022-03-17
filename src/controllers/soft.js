import servicioSoft from '../servicios/soft.js'

export default {
    // getSoft: async(req, res) => { //vista de productos
    //     return res.render('productos.ejs')
    // },

    getSoftApi: async(req, res, next) => { //Devuelve todos los productos
        try{
            const soft = await servicioSoft.getAll()
            res.json(soft)
        }
        catch(error){
            next(error)
        }
    },

    getByIdSoftApi: async(req, res, next) => { //Devuelve producto por id
        try{ 
            let id = req.params.id;
            const soft = await servicioSoft.getById(id)
            if(soft) res.json(soft) //devuelve el producto
            else res.json({ error : 'soft no encontrado' })// se cambia la palabra productos por soft
        }
        catch(error){
            next(error)
        }
    },

    postSoftApi: async (req, res, next) => { //Agrega producto
        try{
            const id = await servicioSoft.save(req.body)
            if(id) res.json({id: id})
            else res.json({ error : 'campos incompletos o no válidos' })
        }
        catch (error){
            next(error)
        }
    },

    deleteByIdSoftApi: async (req,res,next)=>{ //Elimina producto por id
        try{ 
            let id = req.params.id;
            const resultado = await servicioSoft.deleteByIdProducto(id)
            if(resultado){
                res.json({ resultado: 'soft eliminado' })
            } 
            else res.json({ error : 'soft no encontrado' })
        }
        catch(error){
            next(error)
        }
    },

    putByIdSoftApi: async (req,res,next)=>{ //Actualiza productos por id
        try{ 
            let id = req.params.id;
            let softMod = req.body
            let resultado = await servicioSoft.update(id,softMod) 
            if(resultado){
                res.json({ resultado: 'soft actualizado' })
            } 
            else res.json({ error : 'soft no encontrado y/o campos incompletos o no válidos' })
        }
        catch(error){
            next(error)
        }
    }
}