import servicioOrdenes from '../servicios/ordenes.js'

export default {
    
    getOrdenes: async(req, res) => { //vista de ordenes
        return res.render('ordenes.ejs')
    },

    getOrdenesApi: async(req, res, next) => { //Devuelve todos las ordenes
        try{
            const ordenes = await servicioOrdenes.getAll()
            res.json(ordenes)
        }
        catch(error){
            next(error)
        }
    },

    getByIdOrdenesApi: async(req, res, next) => { //Devuelve orden por id
        try{ 
            let id = req.params.id;
            const orden = await servicioOrdenes.getById(id)
            if(orden) res.json(orden) //devuelve la orden
            else res.json({ error : 'orden no encontrada' })
        }
        catch(error){
            next(error)
        }
    },

    getByEmailOrdenesApi: async(req, res, next) => { //Devuelve orden por email
        try{ 
            let email = req.params.email;
            const ordenes = await servicioOrdenes.getByEmail(email)
            if(ordenes) res.json(ordenes) //devuelve las ordenes
            else res.json({ error : 'orden no encontrada para ese email' })
        }
        catch(error){
            next(error)
        }
    }
}