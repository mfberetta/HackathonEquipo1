import controllerMensajes from '../controllers/mensajes.js'
import {authentication} from '../../utils/jwt.js'
/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerMensajes = new Router()
routerMensajes.use(express.json())
routerMensajes.use(express.urlencoded({ extended: true }))
/*-----------------------------------------------------------*/
//Manejador de error a nivel router
routerMensajes.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
})
/*-----------------------------------------------------------*/
//Rutas
routerMensajes.get('/',controllerMensajes.getMensajes) //Vista de chat
routerMensajes.get('/:email',controllerMensajes.getMensajesUsuario) //Vista de chat del usuario

export default routerMensajes