/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerLogin = new Router()
routerLogin.use(express.json())
routerLogin.use(express.urlencoded({ extended: true }))
import controllerLogin from '../controllers/login.js'
import {authentication} from '../../utils/jwt.js'
/*-----------------------------------------------------------*/
//Register
routerLogin.get('/registro', controllerLogin.getRegister)
routerLogin.post('/registro', controllerLogin.postRegister)
routerLogin.get('/registro-error', controllerLogin.getRegisterError)
/*-----------------------------------------------------------*/
//Login
routerLogin.get('/login', controllerLogin.getLogin)
routerLogin.post('/login', controllerLogin.postLogin)
routerLogin.get('/login-error', controllerLogin.getLoginError)
/*-----------------------------------------------------------*/
//Ecommerce
routerLogin.get('/auth', authentication)
routerLogin.get('/', controllerLogin.getMain)

export default routerLogin