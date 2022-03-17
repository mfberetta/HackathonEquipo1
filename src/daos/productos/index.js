import config from '../../../config/config.js'
import dotenv from 'dotenv'
dotenv.config()

let productosDao

switch (process.env.PRODUCTOS) {
    case 'archivo':
        const { default: ProductosDaoArchivo } = await import('./ProductosDaoArchivo.js')
        productosDao = new ProductosDaoArchivo(config.fileSystem.path)
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('../../models/Productos.js')
        productosDao = new ProductosDaoMongoDb()
        break
    default:
        const { default: ProductosDaoMem } = await import('./ProductosDaoMem.js')
        productosDao = new ProductosDaoMem()
        break
}

export { productosDao }