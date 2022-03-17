import { mensajesDao } from '../daos/mensajes/index.js'
import dotenv from 'dotenv'
dotenv.config()
const MAIL_NOTIFICACIONES = process.env.MAIL_NOTIFICACIONES

export default {
    //guarda mensaje
    save: async(datos) => {
        if(datos.texto=='') return null //si el mensaje está vacio
        const fyh= new Date()
        datos = Object.assign({fyh: fyh.toLocaleString()}, datos)
        const id = await mensajesDao.save(datos)
        return {id: id}
    },
    //obiene todos los mensajes
    getAll: async() => {
        const mensajes = await mensajesDao.getAll()
        return mensajes
    },
    //obiene mensajes del usuario (email)
    getMsgsUser: async(email) => {
        const mensajes = await mensajesDao.getByEmail({'email':email}) //busca en persistencia por email
        return mensajes
    },
    //gernera respuesta del sistema
    response: async(email) => {
        const fyh= new Date()
        let datos= {
            email: MAIL_NOTIFICACIONES,
            tipo: 'sistema',
            fyh: fyh.toLocaleString(),
            texto: `Estimado ${email} hemos recibido su consulta le responderemos a la brevedad`
        }
        const id = await mensajesDao.save(datos)
        return {id: id}
    }
}
