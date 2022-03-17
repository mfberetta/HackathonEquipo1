import controllerOrdenes from '../controllers/ordenes.js'
import {authentication} from '../../utils/jwt.js'
/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerOrdenes = new Router()
routerOrdenes.use(express.json())
routerOrdenes.use(express.urlencoded({ extended: true }))
/*-----------------------------------------------------------*/
//Manejador de error a nivel router
routerOrdenes.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
})
/*-----------------------------------------------------------*/
// Rutas de API
//GET -> devuelve todos las ordenes
routerOrdenes.get('/',authentication,controllerOrdenes.getOrdenesApi)

//GET /:id -> devuelve una orden según su id.
routerOrdenes.get('/:id', authentication,controllerOrdenes.getByIdOrdenesApi)

//GET /:email/usurio -> devuelve las ordenes según su email.
routerOrdenes.get('/:email/usuario', authentication,controllerOrdenes.getByEmailOrdenesApi)

export default routerOrdenes