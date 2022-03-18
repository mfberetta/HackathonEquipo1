import servicioSoft from '../services/soft.js'

export default {


    getByEmailSoftApi: async(req, res, next) => {

        try {
            let user = req.user.email
            const soft = await servicioSoft.getByQuery(user)
            if (soft) res.json(soft)
            else res.json({ error: 'soft no encontrado' })

        } catch (error) {

        }
    },

    postSoftApi: async(req, res, next) => {
        try {
            const id = await servicioSoft.save(req.body)
            if (id) res.json({ id: id })
            else res.json({ error: 'campos incompletos o no válidos' })
        } catch (error) {
            next(error)
        }
    },

    deleteByIdSoftApi: async(req, res, next) => {
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

    putByIdSoftApi: async(req, res, next) => {
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