import config from '../../../config/config.js'
import dotenv from 'dotenv'
dotenv.config()

let carritosDao

switch (process.env.CARRITOS) {
    case 'archivo':
        const { default: CarritosDaoArchivo } = await import('./CarritosDaoArchivo.js')
        carritosDao = new CarritosDaoArchivo(config.fileSystem.path)
        break
    case 'mongodb':
        const { default: CarritosDaoMongoDb } = await import('../../models/Carritos.js')
        carritosDao = new CarritosDaoMongoDb()
        break
    default:
        const { default: CarritosDaoMem } = await import('./CarritosDaoMem.js')
        carritosDao = new CarritosDaoMem()
        break
}

export { carritosDao }