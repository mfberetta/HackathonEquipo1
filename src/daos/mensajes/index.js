import config from '../../../config/config.js'
import dotenv from 'dotenv'
dotenv.config()

let mensajesDao

switch (process.env.MENSAJES) {
    case 'archivo':
        const { default: MensajesDaoArchivo } = await import('./MensajesDaoArchivo.js')
        mensajesDao = new MensajesDaoArchivo(config.fileSystem.path)
        break
    case 'mongodb':
        const { default: MensajesDaoMongoDb } = await import('../../models/Mensajes.js')
        mensajesDao = new MensajesDaoMongoDb()
        break
    default:
        const { default: MensajesDaoMem } = await import('./MensajesDaoMem.js')
        mensajesDao = new MensajesDaoMem()
        break
}

export {mensajesDao}