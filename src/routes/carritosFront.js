import controllerCarritos from '../controllers/carrito.js'
/*-----------------------------------------------------------*/
import express from 'express'
const { Router } = express
const routerFrontCarritos = new Router()
routerFrontCarritos.use(express.json())
routerFrontCarritos.use(express.urlencoded({ extended: true }))
/*-----------------------------------------------------------*/
//Manejador de error a nivel router
routerFrontCarritos.use((err, req, res, next) => {
    logger.error(err)
    res.status(500).json({ error: 'Algo salio mal...' })
})
/*-----------------------------------------------------------*/
//Rutas
routerFrontCarritos.get('/',controllerCarritos.getCarritos) //Vista de carritos
/*-----------------------------------------------------------*/

export default routerFrontCarritos