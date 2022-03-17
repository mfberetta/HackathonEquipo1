import servicioCarrito from '../servicios/carrito.js'

export default {
    getCarritos: async(req, res) => {
        return res.render('carritos.ejs') //vista de carritos
    },
    
    getCarritosApi: async(req, res, next) => { //Devuelve todos los carritos
        try{
            const carritos = await servicioCarrito.getAll()
            res.json(carritos)
        }
        catch(error){
            next(error)
        }
    },

    getByIdCarritosApi: async(req, res,next) => { //Devuelve carrito por id
        try{ 
            let id = req.params.id;
            const carrito = await servicioCarrito.getById(id)
            if(carrito) res.json(carrito) //devuelve el carrito
            else res.json({ error : 'carrito no encontrado' })
        }
        catch(error){
            next(error)
        }
    },

    getProductosByIdCarritosApi: async(req, res, next) => { //devuelve los productos del carrito
        try{ 
            let id = req.params.id;
            const productos = await servicioCarrito.getProductos(id)
            if(productos) res.json(productos) //devuelve el contenido de la clave producto
            else res.json({ error : 'carrito no encontrado' })
        }
        catch(error){
            next(error)
        }
    },  

    postCarritosApi: async(req, res, next) => { //creo carrito
        try{
            const id = await servicioCarrito.save(req.body)
            if(id) res.json({id: id})
            else res.json({ error : 'direccion y/o mail incorrectos' })
        }
        catch (error){
            next(error)
        }
    },

    deleteByIdCarritosApi: async(req,res,next)=>{ //Elimina carrito
        try{ 
            let id = req.params.id;
            const resultado = await servicioCarrito.deleteByIdCarrito(id)
            if(resultado){
                res.json({ resultado: 'carrito eliminado' })
            } 
            else res.json({ error : 'carrito no encontrado' })
        }
        catch(error){
            next(error)
        }
    },

    deleteByIdProductosByIdCarritosApi: async(req,res,next)=>{ //Elimina producto del carrito
        try{ 
            const id = req.params.id
            const idProd = req.params.id_prod
            const resultado = await servicioCarrito.deleteByIdProductosByIdCarritos(id,idProd)
            if(resultado){
                res.json({ resultado: 'carrito actualizado' })
            } 
            else res.json({ error : 'carrito y/o producto no encontrado' })
        }
        catch(error){
            next(error)
        }
    },

    postProdutoByIdCarritosApi: async(req,res,next)=>{ //Agrega producto al carrito
        try{ 
            const id = req.params.id
            const idProd = req.params.id_prod
            const carrito = servicioCarrito.addProdutoByIdCarritos(id,idProd) 
            .then((carrito) => {
                if(carrito){
                    res.json({ resultado: 'carrito actualizado' })
                } 
                else res.json({ error : 'carrito y/o producto no encontrado' })
            })
        }
        catch(error){
            next(error)
        }
    },

    postProcesaByIdCarritosApi: async(req,res,next)=>{ //compra carrito
        try{ 
            const id = req.params.id;
            const orden = servicioCarrito.ProcesaByIdCarritos(id) 
            .then((orden) => {
                if(orden){
                    res.json({ id: orden })
                } 
                else res.json({ error : 'carrito no encontrado o sin productos agregados' })
            })
        }
        catch(error){
            next(error)
        }
    },

    getByEmailCarritosApi: async(req, res, next) => { //Devuelve carrito por email
        try{ 
            let email = req.params.email;
            const carritos = await servicioCarrito.getByEmail(email)
            if(carritos) res.json(carritos) //devuelve los carritos
            else res.json({ error : 'carrito no encontrado para ese email' })
        }
        catch(error){
            next(error)
        }
    }
}
/*-----------------------------------------------------------*/