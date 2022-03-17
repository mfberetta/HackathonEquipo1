let usuariosDao

const { default: UsuariosDaoMongoDb } = await import('../../models/Usuarios.js')
usuariosDao = new UsuariosDaoMongoDb()

export { usuariosDao }