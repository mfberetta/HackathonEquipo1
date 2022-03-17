import config from '../../../config/config.js'
import dotenv from 'dotenv'
dotenv.config()

let ordenesDao

switch (process.env.ORDENES) {
    case 'archivo':
        const { default: OrdenesDaoArchivo } = await import('./OrdenesDaoArchivo.js')
        ordenesDao = new OrdenesDaoArchivo(config.fileSystem.path)
        break
    case 'mongodb':
        const { default: OrdenesDaoMongoDb } = await import('../../models/Ordenes.js')
        ordenesDao = new OrdenesDaoMongoDb()
        break
    default:
        const { default: OrdenesDaoMem } = await import('./OrdenesDaoMem.js')
        ordenesDao = new OrdenesDaoMem()
        break
}

export { ordenesDao }