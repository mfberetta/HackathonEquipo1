import servicioProductos from '../servicios/productos.js'

export default {
    getProductos: async(req, res) => { //vista de productos
        return res.render('productos.ejs')
    },

    getProductosApi: async(req, res, next) => { //Devuelve todos los productos
        try{
            const productos = await servicioProductos.getAll()
            res.json(productos)
        }
        catch(error){
            next(error)
        }
    },

    getByIdProductosApi: async(req, res, next) => { //Devuelve producto por id
        try{ 
            let id = req.params.id;
            const producto = await servicioProductos.getById(id)
            if(producto) res.json(producto) //devuelve el producto
            else res.json({ error : 'producto no encontrado' })
        }
        catch(error){
            next(error)
        }
    },

    postProductosApi: async (req, res, next) => { //Agrega producto
        try{
            const id = await servicioProductos.save(req.body)
            if(id) res.json({id: id})
            else res.json({ error : 'campos incompletos o no válidos' })
        }
        catch (error){
            next(error)
        }
    },

    deleteByIdProductosApi: async (req,res,next)=>{ //Elimina producto por id
        try{ 
            let id = req.params.id;
            const resultado = await servicioProductos.deleteByIdProducto(id)
            if(resultado){
                res.json({ resultado: 'producto eliminado' })
            } 
            else res.json({ error : 'producto no encontrado' })
        }
        catch(error){
            next(error)
        }
    },

    putByIdProductosApi: async (req,res,next)=>{ //Actualiza productos por id
        try{ 
            let id = req.params.id;
            let productoMod = req.body
            let resultado = await servicioProductos.update(id,productoMod) 
            if(resultado){
                res.json({ resultado: 'producto actualizado' })
            } 
            else res.json({ error : 'producto no encontrado y/o campos incompletos o no válidos' })
        }
        catch(error){
            next(error)
        }
    }
}