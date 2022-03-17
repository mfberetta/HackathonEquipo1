import {generateAuthToken} from '../../utils/jwt.js'
import path from 'path'
import {createHash, isValidPassword} from '../../utils/utilsLogin.js' 
import { usuariosDao } from '../daos/usuarios/index.js'
import config from '../../config/config.js'
import dotenv from 'dotenv'
dotenv.config()

const MAIL_NOTIFICACIONES = process.env.MAIL_NOTIFICACIONES
const __dirname = path.resolve()

export default {
    register: async (usuarioSignup) => {
        let usuario = []
        const { email } = usuarioSignup
        if (email == config.admin.username){
            return null //no se puede registrar el usuario admin.
        }
        //verifica mail si no se cumple la expresion regular no es mail (retorna null)
        if (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
            return null //mail invalido
        }
        usuario = await usuariosDao.getByEmail({'email':email}) //busca en la persistencia por email
        if (usuario.length != 0) {
            return null //usuario ya existe
        }
        if (usuarioSignup.password != usuarioSignup.password1) {
            return null //las password no coinciden
        }
        const user = usuarioSignup
        user.password = createHash(usuarioSignup.password) //encripta el password
        await usuariosDao.create(user)
        
        const access_token = generateAuthToken(email)
        const response =
        {
            email,
            access_token
        }
        return response
    },

    login: async (usuarioLogin) => {
        let user = []
        const { email, password } = usuarioLogin
        if (email == config.admin.username){ //Es usuario admin
            if(password != config.admin.password){
                return null //password de admin incorrecto
            }
            config.setUserRol('admin')// usuario administrador
        }
        else{ //no es el usuario admin, valida usuario en persistencia
            user = await usuariosDao.getByEmail({'email':email}) //buscar en la persistencia por email
            if (user.length == 0) {
                return null //usuario no registrado
            }
            const credencialesOk = user[0].email == email && isValidPassword(user[0].password,password)
            if (!credencialesOk) {
                return null //credenciales invalidas
            }
            config.setUserRol('user')// usuario normal
        }
        
        const role = user[0].role
        const objectives = user[0].objectives
        const description = user[0].description
        const members = user[0].members

        const access_token = generateAuthToken(email)
        const response =
        {
            email,
            access_token,
            role,
            objectives,
            description,
            members
        }
        return response
    }
}