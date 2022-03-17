import config from '../../../config/config.js'
import dotenv from 'dotenv'
dotenv.config()

let usuariosDao

switch (process.env.USUARIOS) {
    case 'archivo':
        const { default: UsuariosDaoArchivo } = await import('./UsuariosDaoArchivo.js')
        usuariosDao = new UsuariosDaoArchivo(config.fileSystem.path)
        break
    case 'mongodb':
        const { default: UsuariosDaoMongoDb } = await import('../../models/Usuarios.js')
        usuariosDao = new UsuariosDaoMongoDb()
        break
    default:
        const { default: UsuariosDaoMem } = await import('./UsuariosDaoMem.js')
        usuariosDao = new UsuariosDaoMem()
        break
}

export { usuariosDao }