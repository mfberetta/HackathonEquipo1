export default {
    //vista de mensajes
    getMensajes: async(req, res) => {
        return res.render('mensajes.ejs')
    },
    //vista de mensajes del usuario
    getMensajesUsuario: async(req, res) => {
        return res.render('mensajesUsuario.ejs')
    }
}
