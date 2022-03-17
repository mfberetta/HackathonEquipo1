import controllerOrdenes from '../controllers/ordenes.js'
import express from 'express'
const { Router } = express
const routerFrontOrdenes = new Router()
routerFrontOrdenes.use(express.json())
routerFrontOrdenes.use(express.urlencoded({ extended: true }))
import logger from '../../utils/logger.js'
import upload from '../../utils/upload.js'
/*-----------------------------------------------------------*/
//Manejador de error a nivel router
routerFrontOrdenes.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
})
/*-----------------------------------------------------------*/
//Rutas
routerFrontOrdenes.get('/',controllerOrdenes.getOrdenes) //Vista de productos
/*-----------------------------------------------------------*/

export default routerFrontOrdenes