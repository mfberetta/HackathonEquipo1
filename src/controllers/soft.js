import servicioSoft from '../servicios/soft.js'

export default {


    getByEmailSoftApi: async(req, res, next) => {

        try {
            let user = req.user;
            const soft = await servicioSoft.getByQuery(user)
            if (soft) res.json(soft) //return credentials
            else res.json({ error: 'soft no encontrado' })

        } catch (error) {

        }
    },

    postSoftApi: async(req, res, next) => { //Agrega producto
        try {
            const id = await servicioSoft.save(req.body)
            if (id) res.json({ id: id })
            else res.json({ error: 'campos incompletos o no válidos' })
        } catch (error) {
            next(error)
        }
    },

    deleteByIdSoftApi: async(req, res, next) => { //Elimina producto por id
        try {
            let id = req.params.id;
            const resultado = await servicioSoft.deleteByIdProducto(id)
            if (resultado) {
                res.json({ resultado: 'soft eliminado' })
            } else res.json({ error: 'soft no encontrado' })
        } catch (error) {
            next(error)
        }
    },

    putByIdSoftApi: async(req, res, next) => { //Actualiza productos por id
        try {
            let id = req.params.id;
            let softMod = req.body
            let resultado = await servicioSoft.update(id, softMod)
            if (resultado) {
                res.json({ resultado: 'soft actualizado' })
            } else res.json({ error: 'soft no encontrado y/o campos incompletos o no válidos' })
        } catch (error) {
            next(error)
        }
    }
}